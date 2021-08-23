import { useState } from 'react'
import products from '../data/products'

interface Seller { [key: string]: any }

export default function SellerPortal() {
    const [seller, setSeller] = useState(null as Seller);

    const handleSubmit = async e => {
        e.preventDefault();

        await fetch(`/api/seller/retrieve?sellerId=${e.target.sellerId.value}`, { 
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => setSeller(res.seller))

        console.log('sellerportal', seller)
    }

    return (
        <div className='content mt-10'>
            { !seller ?
            <div className='text-center font-mono text-yellow-500'>
                <h1 className='text-2xl'>Seller Portal</h1>
                <form className="divide-gray-200" onSubmit={handleSubmit}>
                    <div className="divide-gray-200">
                        <div className="mt-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="sellerId" className="block text-sm font-medium text-gray-700">
                                    Seller ID
                                </label>
                                <div className="mt-1 w-100 rounded-md shadow-sm">
                                    <input
                                    type="text"
                                    name="sellerId"
                                    id="sellerId"
                                    autoComplete="sellerId"
                                    className="rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                        <button type='submit'>SUBMIT</button>
                    </div>
                </form>
            </div>
            :
            <div className='font-mono text-yellow-500 mx-20'>
                <>
                    <main className="profile-page">
                        <section className="relative block" style={{ height: "200px" }}>
                        </section>
                        <section className="relative py-16">
                            <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        {seller?.id}
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                            22
                                            </span>
                                            <span className="text-sm text-gray-500">Products</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                            10
                                            </span>
                                            <span className="text-sm text-gray-500">Payments</span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                    { seller?.settings?.dashboard?.display_name }
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                                    { seller?.business_profile?.support_address?.city + ', ' + seller?.business_profile?.support_address?.state}
                                </div>
                                <div className="mb-2 text-gray-700 mt-4">
                                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                                    { seller?.email }
                                </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                <div className="flex flex-wrap justify-center">                            
                                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                        {products.slice(0,4).map((product) => (
                                            <div key={product.id} className="group relative">
                                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                                <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                                />
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={product.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                            </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </section>
                    </main>
                </>

                <pre className='bg-gray-300 p-4 rounded-lg'>
                    {JSON.stringify(seller, null, 2)}
                </pre>
            </div> 
            }
        </div>
    )
}