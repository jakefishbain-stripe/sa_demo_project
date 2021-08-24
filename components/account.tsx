import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import products from '../data/products'

interface Seller { [key: string]: any }

export default function Account({ session }) {
  const [seller, setSeller] = useState(null as Seller);
  const [addItem, setAddItem] = useState(false);

  const getStripeUser = async () => {
      // e.preventDefault();

      console.log('getting seller sellerportal', seller)
      await fetch(`/api/seller/retrieve?sellerId=${stripe_id}`, { 
          method: 'GET',
          headers: {
              'content-type': 'application/json'
          }
      }).then(res => res.json())
      .then(res => setSeller(res.seller))

      console.log('sellerportal', seller)
  }

  const handleSubmitItem = async e => {
      e.preventDefault()
  }

  // SUPA
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [stripe_id, setStripeId] = useState(null)

  useEffect(() => {
    getProfile()
    // getStripeUser();
  }, [session, stripe_id])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      console.log('SUPA USER', user)
      
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, email, avatar_url, stripe_id`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      console.log('SUPABASE DATA', data)
      if (data) {
        setName(data.full_name)
        setEmail(data.email)
        setAvatarUrl(data.avatar_url)
        setStripeId(data.stripe_id)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
      await getStripeUser();
    }
  }

  async function updateProfile({ name, email, avatar_url, stripe_id }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        full_name: name,
        email,
        avatar_url,
        stripe_id,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mx-20 font-mono text-yellow-500'>
        <>
            <main className="profile-page">
                <section className="relative block" style={{ height: "200px" }}>
                </section>
                <section className="relative py-16">
                    <div className="mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                            <div className="py-3 px-3 mt-32 sm:mt-0">
                                {seller?.id}
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                        #
                                    </span>
                                    <span className="text-sm text-gray-500">Products</span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                        #
                                    </span>
                                    <span className="text-sm text-gray-500">Payments</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                { name }
                                { seller?.settings?.dashboard?.display_name }
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                                { seller?.business_profile?.support_address?.city + ', ' + seller?.business_profile?.support_address?.state}
                            </div>
                            <div className="mb-2 text-gray-700 mt-4">
                                <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                                { seller?.image }
                            </div>
                            { !addItem ?
                            <div className="mb-2 text-gray-700 mt-4">
                                <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                                <button 
                                    className='px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600' 
                                    type='button'
                                    onClick={() => setAddItem(true)}
                                >
                                        + Add Item
                                </button>
                            </div>
                            : null }
                        </div>
                        <div>
                        { addItem ?
                        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmitItem}>
                            <div className="space-y-8 divide-y divide-gray-200">
                            <div>
                                <div>
                                <h3 className="text-lg font-medium text-gray-900 text-center text-yellow-500">Item Information</h3>
                                </div>
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="given-name"
                                        className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        autoComplete="family-name"
                                        className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-yellow-500 rounded-md"
                                    />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image URL
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        id="image"
                                        name="image"
                                        type="text"
                                        className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                    </label>
                                    <div className="flex">
                                    <p>$</p>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        autoComplete="postal-code"
                                        className="shadow-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                type="button"
                                onClick={() => setAddItem(false)}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-yellow-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                                >
                                Cancel
                                </button>
                                <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                                >
                                Add
                                </button>
                            </div>
                            </div>
                        </form>
                        : null }
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
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                            </a>
                                        </h3>
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
    // <div className="form-widget">
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input id="email" type="text" value={session.user.email} disabled />
    //   </div>
    //   <div>
    //     <label htmlFor="name">Name</label>
    //     <input
    //       id="name"
    //       type="text"
    //       value={name || ''}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="email">email</label>
    //     <input
    //       id="email"
    //       type="email"
    //       value={email || ''}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <button
    //       className="button block primary"
    //       onClick={() => updateProfile({ name, email, avatar_url })}
    //       disabled={loading}
    //     >
    //       {loading ? 'Loading ...' : 'Update'}
    //     </button>
    //   </div>

    //   <div>
    //     <button className="button block" onClick={() => supabase.auth.signOut()}>
    //       Sign Out
    //     </button>
    //   </div>
    // </div>
  )
}
