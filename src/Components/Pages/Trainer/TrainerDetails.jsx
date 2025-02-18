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

const TrainerDetails = () => {
    const { id } = useParams();
    const [trainerDetails, isLoading] = useTrainerDetails()
    const [trainerBookings, trainerBookingsLoading] = useTrainerBookings()

    const [isOpen, setIsOpen] = useState(false);


    const { name, image, role, experience,
        availableDays, _id, age, availableTime, email, otherInfo, qualifications,
        skills, trainingInfo, trainingPrograms } = trainerDetails || {};

    if (isLoading || trainerBookingsLoading) return <Loading />



    return (
        <>
            <SectionTitles subHeading={'Details'} heading={'Trainer Details'} />
            {/* <div className="mainCard xl:max-w-[80vw] md:max-w-[95vw] mx-auto grid md:grid-cols-2 gap-4 shadow-yellow-900 border-t border-yellow-900 shadow-lg my-10 rounded-xl">
                <div className="image  space-y-20 justify-self-center mt-20 ">
                    <div>
                        <img src={image} alt="" className=' border-yellow-900 border-2 p-4 rounded-lg w-96' />
                    </div>
                    <div className='my-5 bg-white border-2 p-2 rounded-xl shadow-yellow-900 border-t border-yellow-900 shadow-xl '>
                        <div className="text-black">
                            <div className='flex justify-between '>
                                <span className='border-b-2 border-cyan-300 font-semibold'>Available Slots: ({availableDays.length})</span>
                                <p className="bg-yellow-900 text-white py-1 px-2 rounded-full">
                                    <span className=' font-semibold'>Free:</span> {parseInt(availableTime)} Hrs.</p>
                            </div>
                            <br />
                            <div className=''>
                                {availableDays.map((exp, idx) =>
                                    <Link to={`/trainerBookedPage/${_id}/${exp.value}`} key={idx} >
                                        <Button className='border bg-yellow-900 text-white w-full text-center py-1 rounded-full mt-2'>{exp.value}</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content border-4 bg-white text-black border-yellow-900 rounded-xl m-10 p-10">
                    <h1 className="text-2xl font-bold text-green-400 text-center bg-gray-700/65 py-1 rounded-full mb-5">{name}</h1>
                    <div className='divider divider-accent'></div>
                    <h1 className="text-center font-semibold ">{email}</h1>
                    <h1 className="text-center font-semibold ">Age:{age}</h1>
                    <h1 className="text-center font-semibold ">Role:{role}</h1>
                    <div className='flex justify-center gap-8 my-8'>
                        <Tooltip content="Like">
                            <Typography
                                as="a"
                                href="#facebook"
                                variant="lead"
                                color="blue"
                                textGradient
                            >
                                <FontAwesomeIcon icon={faFacebook} size="xl" className="text-blue-600 hover:text-blue-800" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography
                                as="a"
                                href="#twitter"
                                variant="lead"
                                color="light-blue"
                                textGradient
                            >
                                <FontAwesomeIcon icon={faTwitter} size="xl" className="text-blue-400 hover:text-blue-600" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography
                                as="a"
                                href="#instagram"
                                variant="lead"
                                color="purple"
                                textGradient
                            >
                                <FontAwesomeIcon icon={faInstagram} size="xl" className="text-yellow-900 hover:text-pink-700" />
                            </Typography>
                        </Tooltip>
                    </div>
                    <div className='my-5 bg-white border-2 border-black p-2 rounded-xl'>

                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Experience:</span> {experience.map(exp => exp.value)}</p>

                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Qualifications: </span> {qualifications}</p>
                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Key skills: </span> {skills.join(', ')}</p>
                        <p className=""><span className='border-b-2 border-cyan-300 font-semibold'>Available Time:</span> {availableTime} Hrs.</p>
                        <p className=""><span className='border-b-2 border-cyan-300 font-semibold'>My Classes:</span> {trainerBookings.map(trainerClassName => trainerClassName?.className).join(', ')}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='my-5 max-w-[80vw] mx-auto border-2 p-2 rounded-xl shadow-yellow-900 border-t border-yellow-900 shadow-lg'>
                    <h1 className='text-center border-b-2 mb-4 p-1 border-black font-bold'>Your knowledge: </h1>

                    <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Question: </span> {trainingPrograms.map(exp => exp.value)}</p>
                    <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Answer: </span> {trainingInfo}</p>


                    <p className=""><span className='border-b-2 border-cyan-300 font-semibold'>How we can upgrade our self: </span> {otherInfo}</p>
                </div>
            </div>

            <BeATrainer /> */}



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
