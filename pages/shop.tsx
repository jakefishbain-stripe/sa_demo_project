/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'

import Image from 'next/image'
import products from '../data/products'
import AppContext from '../contexts/appContext'

  export default function Shop() {
    const [cartItems, setCartItems] = useContext(AppContext);

    const addToCart = (product) => {
        console.log(`Adding ${product.name} to cart...`)
        setCartItems([...cartItems, product])
    }

    return (
        <div className="bg-white -mt-10">
            <div className="max-w-2xl mx-auto px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Shop till you drop...</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                <div key={product.id} className='relative'>
                  <div className="group relative">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                    </div>
                    <div className="mt-6 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                            </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 capitalize">{product.color}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                    </div>
                </div>
                    <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="absolute bottom-12 right-0 -mr-5 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">
                            <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
  }