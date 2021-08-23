/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const sellerId = req.query.sellerId

    console.log('sellerID', sellerId)
    const seller = await stripe.accounts.retrieve(sellerId as string)

    res.status(200).json({ seller })
}

