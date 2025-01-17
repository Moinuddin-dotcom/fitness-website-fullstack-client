import React from 'react'
import Hero from '../Components/HomeLayouts/Hero'
import Marque from '../Components/SharedMarque/Marque'
import FeaturedSection from '../Components/HomeLayouts/FeaturedSection'
import AboutUs from '../Components/HomeLayouts/AboutUs'
import FeatureClass from '../Components/HomeLayouts/FeatureClass'
import CustomerOpinioun from '../Components/HomeLayouts/CustomerOpinioun'
import Community from '../Components/HomeLayouts/Community'
import Subscriber from '../Components/HomeLayouts/Subscriber'

const Home = () => {
    return (
        <div>
            <Hero />
            <Marque />
            <FeaturedSection />
            <AboutUs />
            <Marque />
            <FeatureClass />
            <CustomerOpinioun />
            <Community />
            <Subscriber />
        </div>
    )
}

export default Home
