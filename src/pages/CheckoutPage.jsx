import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import Checkout from '../Components/checkout/Checkout'

const CheckoutPage = () => {
  return (
    <div className="bg-black min-h-screen">
       <Navbar/>
       <Checkout/>
       <Footer/>
    </div>
  )
}

export default CheckoutPage
