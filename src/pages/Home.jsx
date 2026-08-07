import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import HeroSection from '../Components/home/HeroSection'
import CategorySection from '../Components/home/CategorySection'
import PopularProducts from '../Components/home/PopularProducts'
import ProductShowcase from '../Components/home/ProductShowcase'
import PairingSection from '../Components/pairing/PairingSection'
import VibeSection from '../Components/vibeSection/VibeSection'
import WineSection from '../Components/home/WineSection'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      <HeroSection/>
      <CategorySection/>
      <PopularProducts/>
      <VibeSection/>
      <PairingSection/>
      <ProductShowcase/>
      <WineSection/>
      <Footer/>
    </div>
  )
}

export default Home
