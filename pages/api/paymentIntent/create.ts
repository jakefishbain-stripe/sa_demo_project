/* eslint-disable import/no-anonymous-default-export */
import{ NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const items = req.body

    let amount = items.reduce(((acc, cv) => +acc + +cv.price), 0) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd"
    });
    
    res.status(200).send({ paymentIntent });
}

