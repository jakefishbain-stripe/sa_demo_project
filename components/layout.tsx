import { useContext } from 'react'

import Navbar from "./navbar"
import AppContext from '../contexts/appContext'
const Layout = ({ children }) => {
    // const [cartItems, setCartItems] = useContext(AppContext);

    return (    
        <div className="content">
            <Navbar />
            { children }
        </div>
    )
}

export default Layout;