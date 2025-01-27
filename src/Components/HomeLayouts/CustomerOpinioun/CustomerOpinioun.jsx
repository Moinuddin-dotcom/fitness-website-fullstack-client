
import useReviews from '../../../Hooks/useReviews'
import Loading from '../../Pages/Loading'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CustomerOpiniounData from './CustomerOpiniounData';



const CustomerOpinioun = () => {



    const [reviews, isLoading] = useReviews()
    console.log(reviews)
    if (isLoading) return <Loading />
    return (
        <div className='border border-white'>
            {/* <h1 className='lg:text-5xl text-center text-white'>CustomerOpinioun(Pending)</h1>
            <p>Review will come from dashboard</p> */}

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {reviews.map(review => <SwiperSlide>
                    <CustomerOpiniounData reviews={review} />
                </SwiperSlide>)}

                {/* <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>

        </div>
    )
}

export default CustomerOpinioun
