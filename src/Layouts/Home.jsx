import React from 'react'
import Hero from '../Components/HomeLayouts/Hero'
import Marque from '../Components/SharedMarque/Marque'
import FeaturedSection from '../Components/HomeLayouts/FeaturedSection'
import AboutUs from '../Components/HomeLayouts/AboutUs'
import FeatureClass from '../Components/HomeLayouts/FeatureClass'
import CustomerOpinioun from '../Components/HomeLayouts/CustomerOpinioun/CustomerOpinioun'
import Community from '../Components/HomeLayouts/Community'
import Subscriber from '../Components/HomeLayouts/Subscriber'
import TeamSection from '../Components/HomeLayouts/TeamSection'
import CustomerOpiniounData from '../Components/HomeLayouts/CustomerOpinioun/CustomerOpiniounData'
import HomeCommunity from '../Components/HomeLayouts/HomeCommunity'
import useAuth from '../Hooks/useAuth'
import Loading from '../Components/Pages/Loading'

const Home = () => {
    const { user, loading } = useAuth()
    console.log(loading)
    if (loading) return <Loading />
    return (
        <div>
            <Hero />
            <Marque />
            <FeaturedSection />
            <AboutUs />
            <Marque />
            <FeatureClass />
            <CustomerOpinioun />
            <HomeCommunity />
            <Subscriber />
            {/* <TeamSection /> */}
        </div>
    )
}

export default Home
