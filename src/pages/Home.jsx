import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import HeroSection from '../Components/home/HeroSection'
import CategorySection from '../Components/home/CategorySection'
import PopularProducts from '../Components/home/PopularProducts'
import VibeSection from '../Components/vibeSection/VibeSection'
import PairingSection from '../Components/pairing/PairingSection'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      <HeroSection/>
      <CategorySection/>
      <PopularProducts/>
      <VibeSection/>
      <PairingSection/>
      <Footer/>
    </div>
  )
}

export default Home
