import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/NavAndFoot/Navbar'
import Footer from '../Components/NavAndFoot/Footer'
import { Helmet } from 'react-helmet'

const Main = () => {
    const location = useLocation()

    const isLogin = location.pathname.includes('login')
    const isRegister = location.pathname.includes('register')
    const isDashboard = location.pathname.includes('dashboard')
    const iscommunity = location.pathname.includes('community')
    return (
        <div className='poppins bg-[#eafaf0] dark:bg-black text-white' >
            <Helmet>
                <title>Home | Aura Fusion Gym</title>
            </Helmet>
            {isLogin || isRegister || isDashboard || iscommunity || <Navbar />}
            <section className='min-h-screen pt-24'>
                <Outlet />
            </section>
            {isLogin || isRegister || isDashboard || <Footer />}

        </div>
    )
}

export default Main
