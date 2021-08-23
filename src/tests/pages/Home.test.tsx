import { render, screen } from "@testing-library/react"

import { stripe } from '../../services/stripe'

import Home, {getStaticProps } from "../../pages"
import { mocked } from "ts-jest/utils"

jest.mock('next-auth/client', () => {
    return {
        useSession: () => [jest.fn()],
        signIn: jest.fn(),
    }
})

jest.mock('../../services/stripe')



describe("Home Page", () => {

    it("should render correctly", () => {
        const product = {
            priceId: "1",
            amount: "$10,00"
        }
        render(
            <Home product={product} />
        )

        expect(screen.getByText(/\$10,00/)).toBeInTheDocument()

    })

    it('load initial data', async () => {

        const retrieveStripePriceMocked = mocked(stripe.prices.retrieve);

        retrieveStripePriceMocked.mockResolvedValueOnce({
            id: 'fake_id',
            unit_amount: 1000
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    product: {
                        priceId: 'fake_id',
                        amount: '$10.00'
                    }
                }
            })
        )
    })
})