import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import ProductDetails from '../Components/product/ProductDetails'

const ProductDetailsPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      <ProductDetails/>
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage
