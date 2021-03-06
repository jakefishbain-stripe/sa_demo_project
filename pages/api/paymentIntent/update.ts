/* eslint-disable import/no-anonymous-default-export */
import{ NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const paymentIntentId = req.body.paymentIntentId
    delete req.body.paymentIntentId

    const customer = await stripe.customers.create({ ...req.body })

    await stripe.paymentIntents.update(paymentIntentId, {
        customer: customer.id
    })
    res.send(200)
}

