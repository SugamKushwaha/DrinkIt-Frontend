import React from 'react'
import AccountPage from '../Components/account/AccountPage'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'

const ProfilePage = () => {
  return (
    <div className="bg-black min-h-screen">
      
      <Navbar/>
      <AccountPage/>
      <Footer/>
      
    </div>
  )
}

export default ProfilePage
