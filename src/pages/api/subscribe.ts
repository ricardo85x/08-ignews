import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/client'
import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe';

type User =  {
    ref: {
        id: string
    },
    data: {
        stripe_customer_id: string
    }
}

export default async (req : NextApiRequest , res: NextApiResponse) => {
    if (req.method === 'POST') {

        const session = await getSession({ req })

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )
        
        let customerId = user.data.stripe_customer_id

        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
                // metadata
            })

            customerId = stripeCustomer.id

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    { 
                        data: {
                            stripe_customer_id: customerId
                        }
                    }
                )
            )

          

        }
        

    

        const stripCheckoutSessions = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { 
                    price:  process.env.STRIPE_PRODUCT_PRICE_ID, 
                    quantity: 1
                }
            ],
            mode: process.env.STRIPE_PAYMENT_MODE as "payment" | "subscription" | "setup",
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        

        return res.status(200).json({ sessionId: stripCheckoutSessions.id })

    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).send('Method Not Allowed');
    }
}