import Navbar from "./navbar"

const Layout = ({ children }) => {
    return (    
        <div className="content">
            <Navbar/>
            <div className='pt-14'>
                { children }
            </div>
        </div>
    )
}

export default Layout;