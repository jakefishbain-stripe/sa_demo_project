/* This example requires Tailwind CSS v2.0+ */
import { useContext, useState, useEffect } from 'react'
import Router from 'next/router'

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import AppContext from '../contexts/appContext'

export default function ElementsCheckout(props) {
  const [cartItems, setCartItems] = useContext(AppContext);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  let amount = cartItems.reduce(((acc, cv) => +acc + +cv.price), 0);

  useEffect(() => {
    fetch('api/paymentIntent/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    }).then( res => res.json())
    .then(res => {
      setPaymentIntent(res.paymentIntent)
    }); 
  }, [cartItems]);

  const [open, setOpen] = useState(true)
  const closeAndCallback = () => {
    setOpen(false);
    props.callback(false);
  }

  const handleSubmit = async e => {
      e.preventDefault();
      //TODO disable submit button
      await fetch('/api/paymentIntent/update', { 
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }, 
        body: JSON.stringify({
          name: `${e.target.firstname.value} ${e.target.lastname.value}`,
          address: {
            city: e.target.city.value,
            // country: 'US',
            line1: e.target.line1.value,
            // line2: e.target.line2.value,
            postal_code: e.target.zip.value,
            state: e.target.state.value
          },
          email: e.target.email.value,
          paymentIntentId: paymentIntent.id
        })
       }).then(res => res.json())

      const payload = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      })

      // TODO - error handling
      // if (payload.error) {
      //   setError(`Payment failed ${payload.error.message}`);
      //   setProcessing(false);
      // } else {
      //   setError(null);
      //   setProcessing(false);
      //   setSucceeded(true);
      // }

      setCartItems([])
      closeAndCallback();
      Router.push(`/result?session_id=${payload.paymentIntent.id}`)
  }

  return (
    <>
    { open ? (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
              Checkout with Elements
              </h3>
              <button 
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => closeAndCallback()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                </span>
              </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              {/* <Elements stripe={promise}> */}
              <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                <div className="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            autoComplete="given-name"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            autoComplete="family-name"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-yellow-500 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country / Region
                        </label>
                        <div className="mt-1">
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div> */}

                      <div className="sm:col-span-6">
                        <label htmlFor="line1" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="line1"
                            id="line1"
                            autoComplete="line1"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="state"
                            id="state"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="zip"
                            id="zip"
                            autoComplete="postal-code"
                            className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardElement/>
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => closeAndCallback()}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-yellow-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                    >
                      Pay ${amount}
                    </button>
                  </div>
                </div>
              </form>
            </p>
          </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
    ) : null }
    </>
  )
}
