import React from 'react'
import AboutUsImage from './AboutUsImage'

const AboutUs = () => {
    return (

        <div className="  lg:max-w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 px-10 py-16 text-white">
            {/* Text Section */}
            <div className="max-w-md space-y-4 self-center">
                <h2 className="text-3xl font-bold ">About Us</h2>
                <h3 className="text-xl font-semibold ">Empowering Your Fitness Journey.</h3>
                <p className="">
                    Welcome to [Gym Name], where fitness meets community, and your goals become our mission. We are more than just a gym – we’re your partner in creating a healthier, stronger, and more confident you. Whether you’re a beginner or a seasoned athlete, we have something tailored just for you.
                </p>
                <p className="">
                    Our gym is equipped with the latest machines and tools designed to support your fitness journey, ensuring safety, efficiency, and versatility.
                </p>
                <button className="px-6 py-2 mt-4 text-white bg-green-500 rounded-full hover:bg-green-600">
                    LEARN MORE
                </button>
            </div>

            {/* Image Section */}
            <AboutUsImage />
        </div>
    )
}

export default AboutUs





