import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import heroBG from '../../../src/assets/images/Hero.jpg'
import banner1 from '../../../src/assets/images/Banner-1.png'
import banner2 from '../../../src/assets/images/Banner-2.png'
import banner3 from '../../../src/assets/images/Banner-3.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Parallax, Autoplay, Pagination, Navigation } from 'swiper/modules';
import HeroSwiperSlide from './HeroSwiperSlide';

const Hero = () => {
    return (
        <div className='min-h-screen ' >
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <HeroSwiperSlide
                        image={heroBG}
                        bannerImage={banner1}
                        title={'FitLife Hub'}
                        description={"Unlock your best self with expert guidance, personalized workout plans, and state-of-the-art equipment to meet all your fitness goals."} />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroSwiperSlide
                        image={heroBG}
                        bannerImage={banner2}
                        title={'Iron Edge Gym'}
                        description={"Build strength, stamina, and confidence with cutting-edge equipment, experienced trainers, and a community that motivates you every day."} />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroSwiperSlide
                        image={heroBG}
                        bannerImage={banner3}
                        title={'The Fitness Forge'}
                        description={"Sculpt your dream physique, one rep at a time, in a supportive environment with customized training plans and advanced fitness tools."} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Hero
