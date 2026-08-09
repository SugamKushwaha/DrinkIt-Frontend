import React from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import HeroSection from '../Components/home/HeroSection'
import CategorySection from '../Components/home/CategorySection'
import PopularProducts from '../Components/home/PopularProducts'
import ProductShowcase from '../Components/home/ProductShowcase'
import WineSection from '../Components/home/WineSection'
import SnacksSection from '../Components/home/SnacksSection'
import PartyBanner from '../Components/home/PartyBanner'
import BuildNightAndDelivery from '../Components/home/BuildNightAndDelivery'
import WeekendDeals from '../Components/home/WeekendDeals'
import PairingSection from '../Components/home/pairing/PairingSection'
import VibeSection from '../Components/home/vibeSection/VibeSection'

const HomePage = () => {
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
      <SnacksSection/>
      <PartyBanner/>
      <BuildNightAndDelivery/>
      <WeekendDeals/>
      <Footer/>
    </div>
  )
}

export default HomePage
