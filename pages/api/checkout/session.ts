/* eslint-disable import/no-anonymous-default-export */
import{ NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

// {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: 'T-shirt',
//       },
//       unit_amount: 2000,
//     },
//     quantity: 1,
//   },

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const { quantity } = req.body;
    // console.log('REQ BODY! 11', req.body)

    let line_items = req.body.map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.imageSrc]
                },
                unit_amount: item.price * 100
            },
            quantity: 1
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shop`,
    })
    res.status(200).json({ sessionId: session.id })
}