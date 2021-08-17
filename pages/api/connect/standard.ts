/* eslint-disable import/no-anonymous-default-export */
import{ NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});


export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  const account = await stripe.accounts.create({
    type: 'standard',
  });

  console.log('req.headers.orgin...', req.headers.origin)
  const accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://example.com/reauth',
    return_url: `${req.headers.origin}/shop`,
    type: 'account_onboarding',
  });

  
  
  res.status(200).send({ url: accountLinks.url })
}