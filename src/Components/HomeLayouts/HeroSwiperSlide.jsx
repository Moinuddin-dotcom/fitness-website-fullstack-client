import React from 'react'
import { Link } from 'react-router-dom'


const HeroSwiperSlide = ({ image, bannerImage, title, description }) => {
    return (
        <div
            className='w-full bg-center bg-cover '
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }}
        >
            {/* flex items-center justify-center */}
            <div className=' w-full min-h-screen bg-gray-900/70'>
                {/* <div className='grid grid-cols-1 md:grid-cols-2'> */}
                <div className='justify-self-center items-center relative'>
                    <img src={bannerImage} alt="" className='md:h-[600px] lg:h-[800px]' />
                </div>
                <div className='absolute top-44 md:left-28 lg:left-60 xl:left-[430px] max-w-xl text-center space-y-4 px-5 my-5 justify-self-center self-center '>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-[#91edb1] to-[#1af968] bg-clip-text text-transparent lg:text-5xl'>{title}</h1>
                    <p className='text-[#e8f7ed]'>{description}</p>
                    <Link
                        to='/all-classes'
                        // className='btn btn-wide underline bg-gradient-to-t from-[#97cdd3] to-[#8e5bb9] text-black'
                        className='btn btn-wide underline bg-[#91edb1] hover:bg-[#91edb1] text-white shadow-2xl hover:shadow-[#91edb1]'
                    >
                        Classes
                    </Link>
                </div>
                {/* </div> */}
            </div>
        </div >
    )
}

export default HeroSwiperSlide
