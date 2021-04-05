import { NextApiRequest, NextApiResponse } from 'next'


export default (req : NextApiRequest, res : NextApiResponse) => {
    const users = [
        { id: 1,nome: 'Ricardo' },
        { id: 2,nome: 'Mara' },
        { id: 3,nome: 'Popey' }
    ]

    return res.json(users)
}