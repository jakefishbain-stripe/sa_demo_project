import Navbar from "./navbar"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";

const Layout = ({ children }) => {
    const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    return (    
        <div className="content">
            <Navbar/>
            <header className="pt-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold font-mono tracking-widest text-yellow-500">STRIPESY</h1>
                </div>
            </header>
            <div className='pt-2'>
                <Elements stripe={promise}>
                    { children }
                </Elements>
            </div>
        </div>
    )
}

export default Layout;