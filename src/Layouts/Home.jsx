import React from 'react'
import Hero from '../Components/HomeLayouts/Hero'
import Marque from '../Components/SharedMarque/Marque'
import FeaturedSection from '../Components/HomeLayouts/FeaturedSection'

const Home = () => {
    return (
        <div>
            <Hero />
            <Marque />
            <FeaturedSection />
        </div>
    )
}

export default Home
