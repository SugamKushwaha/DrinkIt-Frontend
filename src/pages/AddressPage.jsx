import React from 'react'
import Addresses from '../Components/account/Addresses'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'

const AddressPage = () => {
  return (
    <div className="bg-black min-h-screen">
        <Navbar/>
      <Addresses/>
      <Footer/>
    </div>
  )
}

export default AddressPage
