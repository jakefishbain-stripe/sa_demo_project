/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import AppContext from '../contexts/appContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Cart() {
	const [cartItems, setCartItems] = useContext(AppContext);
	let totalPrice = cartItems.reduce(((acc, cv) => +acc + +cv.price), 0);

	const checkout = async () => {
    const { sessionId } = await fetch('api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    }).then(res => res.json());

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
        sessionId
    });
  }

	const removeFromCart = (idx) => {
		console.log('in remove...', idx, cartItems)
		setCartItems(
			cartItems.filter((_value, index, _arr) => {
				return idx != index 
			})
		)
	}

	return (
		<div className='container mx-auto px-24'>
			<div className="mt-8">
				<div className="flow-root">
					<ul role="list" className="divide-y divide-gray-200">
						{cartItems.length > 0 ? cartItems.map((product, idx) => (
							<li key={product.id} className="py-6 flex">
								<div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
									<img
										src={product.imageSrc}
										alt={product.imageAlt}
										className="w-full h-full object-center object-cover"
									/>
								</div>

								<div className="ml-4 flex-1 flex flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href={product.href}>{product.name}</a>
											</h3>
											<p className="ml-4">${product.price}</p>
										</div>
										<p className="mt-1 text-sm text-gray-500 capitalize">{product.color}</p>
									</div>
									<div className="flex-1 flex items-end justify-between text-sm">
										{/* <p className="text-gray-500">Qty {product.quantity}</p> */}
										<div className="flex py-4">
											<button type="button" className="font-medium text-yellow-500 hover:text-yellow-600" onClick={() => removeFromCart(idx)}>
												Remove
											</button>
										</div>
									</div>
								</div>
							</li>
						)) :
						<div className='flex justify-center'>
							<div className='py-10 text-grey-400'>
								<svg xmlns="http://www.w3.org/2000/svg" className="self-center h-20 w-20 stroke-current" fill="none" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
						</div>
						}
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-200 py-10">
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Subtotal</p>
					<p>${+totalPrice}</p>
				</div>
				<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
				{cartItems.length > 0 ? 
					<div onClick={checkout} className="mt-6 justify-items-center">
						<a
							href="#"
							className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600"
						>
							Checkout
						</a>
					</div> 
				: null}
				<div className="mt-6 flex justify-center text-sm text-center text-gray-500">
					<p>
						<button
							type="button"
							className="text-yellow-500 font-medium hover:text-yellow-600"	
						>
							<a href='/shop'>Continue Shopping<span aria-hidden="true"> &rarr;</span></a>
						</button>
					</p>
				</div>
			</div>
		</div>
)}