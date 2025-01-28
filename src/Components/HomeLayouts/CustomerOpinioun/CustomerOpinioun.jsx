
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
import SectionTitles from '../../SharedMarque/SectionTitles';



const CustomerOpinioun = () => {
    const [reviews, isLoading] = useReviews()
    if (isLoading) return <Loading />
    return (
        <div className=' md:max-w-[60vw] mx-auto'>
             <SectionTitles subHeading={'What People Saying?'} heading={'Reviews'} />

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
            </Swiper>

        </div>
    )
}

export default CustomerOpinioun
