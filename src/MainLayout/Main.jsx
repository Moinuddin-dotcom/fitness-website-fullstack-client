import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/NavAndFoot/Navbar'
import Footer from '../Components/NavAndFoot/Footer'
import { Helmet } from 'react-helmet'

const Main = () => {
    const location = useLocation()
    // console.log(location)

    const isLogin = location.pathname.includes('login')
    const isRegister = location.pathname.includes('register')
    return (
        <div className='poppins bg-black text-white' >
            <Helmet>
                <title>Home | Aura Fusion Gym</title>
            </Helmet>
            {isLogin || isRegister || <Navbar />}
            <section className='min-h-screen pt-24'>
                <Outlet />
            </section>
            {isLogin || isRegister || <Footer />}

        </div>
    )
}

export default Main
