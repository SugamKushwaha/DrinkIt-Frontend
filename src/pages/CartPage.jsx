import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Cart from '../Components/cart/Cart'
import Footer from '../Components/layout/Footer'

const CartPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      <Cart/>
      <Footer/>
    </div>
  )
}

export default CartPage
