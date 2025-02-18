import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BeATrainer from './BeATrainer';
import Loading from '../Loading';
import { Button } from '@headlessui/react';
import { Tooltip, Typography } from '@material-tailwind/react';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionTitles from '../../SharedMarque/SectionTitles';
import useTrainerBookings from '../../../Hooks/useTrainerBookings';
import useTrainerDetails from '../../../Hooks/useTrainerDetails';

// import { Button } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import { Helmet } from 'react-helmet';

const TrainerDetails = () => {
    const { id } = useParams();
    const [trainerDetails, isLoading] = useTrainerDetails()
    const [trainerBookings, trainerBookingsLoading] = useTrainerBookings()



    const { name, image, role, experience,
        availableDays, _id, age, availableTime, email, otherInfo, qualifications,
        skills, trainingInfo, trainingPrograms } = trainerDetails || {};

    if (isLoading || trainerBookingsLoading) return <Loading />



    return (
        <>
            <SectionTitles subHeading={'Details'} heading={'Trainer Details'} />
            <Helmet>
                <title>Trainer ({name}) Details | Aura Fusion Gym</title>
            </Helmet>



            <div className="max-w-6xl mx-auto mt-10 p-6 bg-[#e6f3eb] shadow-lg rounded-lg">
                {/* Image and Available Slots */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="" >
                        <img src={image} alt={name} className='rounded-lg shadow-md w-full max-w-sm mx-auto' />
                        {/* <p className="absolute top-2 left-2 bg-white text-black px-2 py-1 text-xs rounded">Click to Edit</p> */}
                    </div>
                    <div className="p-4 border rounded-lg bg-[#eafaf0]">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Available Slots ({availableDays.length})</h2>
                        <p className="text-sm text-gray-700 mb-2">Free Time: <span className="font-semibold">{availableTime} Hrs.</span></p>
                        <div className="grid grid-cols-2 gap-2">
                            {availableDays.map((day, idx) => (
                                <Link to={`/trainerBookedPage/${id}/${day.value}`} key={idx}>
                                    <Button className='w-full text-center bg-[#126e32] hover:shadow-2xl shadow-[#126e32] text-white py-2 rounded-lg'>{day.value}</Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trainer Details */}
                <div className="mt-6 p-4 border rounded-lg bg-[#eafaf0]">
                    <h1 className="text-2xl font-bold text-center text-[#08170d]">{name}</h1>
                    <p className="text-center text-gray-600">{email} | Age: {age} | Role: {role}</p>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                        <p className='text-gray-800'><span className="font-semibold text-gray-700">Experience:</span> {experience.map(exp => exp.value).join(', ')}</p>
                        <p className='text-gray-800'><span className="font-semibold text-gray-700">Qualifications:</span> {qualifications}</p>
                        <p className='text-gray-800'><span className="font-semibold text-gray-700">Key Skills:</span> {skills.join(', ')}</p>
                        <p className='text-gray-800'><span className="font-semibold text-gray-700">Classes Taken:</span> {trainerBookings.map(classInfo => classInfo.className).join(', ')}</p>
                    </div>
                </div>

                {/* Be a Trainer Section */}
                <BeATrainer />

            </div>


        </>
    );
}

export default TrainerDetails
