import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import Wishlist from '../Components/common/WishList'

const WishListPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      <Wishlist/>
      <Footer/>
    </div>
  )
}

export default WishListPage
