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
            <div className='flex items-center justify-center w-full min-h-screen bg-gray-900/70'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='justify-self-center items-center'>
                        <img src={bannerImage} alt="" className='md:h-[600px] lg:h-[800px]' />
                    </div>
                    <div className='text-center space-y-4 px-5 my-5 justify-self-center self-center '>
                        <h1 className='text-3xl font-bold text-white lg:text-4xl'>{title}</h1>
                        <p>{description}</p>
                        <Link
                            to='/all-classes'
                            className='btn btn-wide underline bg-gradient-to-t from-[#c1e502] to-[#ced8d1] text-black'
                        >
                            Classes
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeroSwiperSlide
