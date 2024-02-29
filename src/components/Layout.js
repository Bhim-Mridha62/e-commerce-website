import React from 'react'
import Navbar from './common/Navbar/Navbar'
import Footer from './common/Footer/Footer'
function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
    </div>
  )
}

export default Layout