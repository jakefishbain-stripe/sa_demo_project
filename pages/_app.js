import { useState } from 'react'
// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import AppContext from '../contexts/appContext'

function MyApp({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([])

  return (
    <AppContext.Provider value={[cartItems, setCartItems]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp
