import React from 'react'
import Navbar from '../Components/layout/Navbar'
import OrderSuccess from '../Components/orderSuccess/OrderSuccess'
import Footer from '../Components/layout/Footer'

const OrderSuccessPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      <OrderSuccess/>
      <Footer/>
    </div>
  )
}

export default OrderSuccessPage
