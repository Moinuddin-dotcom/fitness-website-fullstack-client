
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import aboutImg1 from '../../../src/assets/images/about-1.jpeg'
import aboutImg2 from '../../../src/assets/images/about-2.jpeg'
import aboutImg3 from '../../../src/assets/images/about-3.jpeg'
import aboutImg4 from '../../../src/assets/images/about-4.jpeg'
import aboutImg5 from '../../../src/assets/images/about-5.jpeg'
import aboutImg6 from '../../../src/assets/images/about-6.jpeg'

const AboutUsImage = () => {
    return (
        <div className="flex justify-center items-center ">
            <Swiper
                effect="cards"
                grabCursor={true}
                modules={[EffectCards]}
                className="xl:w-[500px] lg:w-96 md:w-[400px] w-60 h-80 shadow-2xl shadow-orange-300"
            >
                <SwiperSlide className="flex justify-center items-center bg-red-500 text-white text-lg font-bold rounded-lg">
                    <img src={aboutImg1} className='h-full w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center bg-blue-500 text-white text-lg font-bold rounded-lg">
                    <img src={aboutImg2} alt="" className='h-full w-full' />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center bg-green-500 text-white text-lg font-bold rounded-lg">
                    <img src={aboutImg3} alt="" className='h-full w-full' />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center bg-yellow-500 text-white text-lg font-bold rounded-lg">
                    <img src={aboutImg4} alt="" className='h-full w-full' />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center bg-purple-500 text-white text-lg font-bold rounded-lg">
                    <img src={aboutImg5} alt="" className='h-full w-full' />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center bg-pink-500 text-white text-lg font-bold rounded-lg">
                    <img src={aboutImg6} alt="" className='h-full w-full' />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default AboutUsImage
