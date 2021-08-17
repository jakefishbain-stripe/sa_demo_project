/* eslint-disable import/no-anonymous-default-export */
import{ NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const paymentIntent = await stripe.paymentIntents.retrieve(id as string)
    res.status(200).json({ paymentIntent })
}