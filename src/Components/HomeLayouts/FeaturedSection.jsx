import React, { useEffect, useState } from 'react';
import SectionTitles from '../SharedMarque/SectionTitles';



const FeaturedSection = () => {
    const [features, setFeatures] = useState([])
    const featureData = async () => {
        const res = await fetch('/public/feature.json')
        const data = await res.json()
        setFeatures(data)
    }

    useEffect(() => {
        featureData()
    }, [])


    return (
        <div className=" py-12 px-4 sm:px-6 lg:px-8 max-w-[80vw] mx-auto">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">

            </h2>
            <SectionTitles subHeading={'Why Choose Us?'} heading={'Features'} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
                    >
                        <img src={feature.icon} className='h-16 mb-4' alt="" />
                        <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;
