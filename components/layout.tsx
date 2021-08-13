import Navbar from "./navbar"

const Layout = ({ children }) => {
    return (    
        <div className="content">
            <Navbar />
            { children }
        </div>
    )
}

export default Layout;