/* eslint-disable import/no-anonymous-default-export */
import{ NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const items = req.body
    const paymentIntentId = req.body.paymentIntentId
    delete req.body.paymentIntentId

    // console.log('update body!', req.body)

    const customer = await stripe.customers.create({ ...req.body })

    await stripe.paymentIntents.update(paymentIntentId, {
        customer: customer.id
    })
    
    // res.status(200).send({
    //     clientSecret: paymentIntent.client_secret
    // });
    // const paymentIntent = await stripe.paymentIntents.retrieve()
    res.send(200)
}

