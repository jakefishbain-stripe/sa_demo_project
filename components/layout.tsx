import Navbar from "./navbar"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";

const Layout = ({ children }) => {
    const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    return (    
        <div className="content">
            <Navbar/>
            <div className='pt-14'>
                <Elements stripe={promise}>
                    { children }
                </Elements>
            </div>
        </div>
    )
}

export default Layout;