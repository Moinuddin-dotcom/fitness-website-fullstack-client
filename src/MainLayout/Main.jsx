import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/NavAndFoot/Navbar'
import Footer from '../Components/NavAndFoot/Footer'
import { Helmet } from 'react-helmet'

const Main = () => {
    return (
        <div className='poppins bg-black text-white' >
            <Helmet>
                <title>Home | Aura Fusion Gym</title>
            </Helmet>
            <Navbar />
            <section className='min-h-screen'>

            <Outlet />
            </section>
            <Footer />

        </div>
    )
}

export default Main
