import React from 'react'
import { Link, useParams } from 'react-router-dom'
import BeATrainer from './BeATrainer';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../Loading';
import { Button, Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Chip, Tooltip, Typography } from '@material-tailwind/react';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useClasses from '../../../Hooks/useClasses';


const TrainerDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const [adminClasses] = useClasses()

    const { data: trainerDetails = [], isLoading } = useQuery({
        queryKey: ['trainerDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/trainerDetails/${id}`)
            // console.log(data)
            return data
        }
    })
    // console.log(trainerDetails)
    if (isLoading) return <Loading />

    const { name, image, role, experience,
        availableDays, _id, age, availableTime,
        cost, email, otherInfo, qualifications,
        skills, status, trainingInfo, trainingPrograms,
        slotName, slotTime } = trainerDetails || {};



    return (
        <>
            <div className="mainCard max-w-[80vw] mx-auto grid grid-cols-2 gap-4 border-4 border-fuchsia-800 my-10 rounded-xl">
                <div className="image  space-y-40 justify-self-center mt-20 ">
                    <div>
                        <img src={image} alt="" className='border-4 border-fuchsia-800 border-dotted p-4 rounded-full w-96' />
                    </div>
                    <div className='my-5 bg-white border-2 border-black p-2 rounded-xl  '>
                        <div className="text-black">
                            <div className='flex justify-between'>
                                <span className='border-b-2 border-cyan-300 font-semibold'>Available Slots: ({availableDays.length})</span>
                                <p className="bg-green-400 py-1 px-2 rounded-full">
                                    <span className=' font-semibold'>Free:</span> {availableTime - slotTime} Hrs.</p>
                            </div>
                            <br />
                            <div className=''>
                                {availableDays.map((exp, idx) =>
                                    <Link to={`/trainerBookedPage/${_id}/${exp.value}`} key={idx}>
                                        <Button className='border bg-green-500 w-full text-center py-1 rounded-full mt-2'>{exp.value}</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content border-4 bg-white/65 text-black border-fuchsia-800 rounded-xl m-10 p-10">
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
                                <FontAwesomeIcon icon={faInstagram} size="xl" className="text-pink-500 hover:text-pink-700" />
                            </Typography>
                        </Tooltip>
                    </div>
                    <div className='my-5 bg-white border-2 border-black p-2 rounded-xl'>

                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Experience:</span> {experience.map(exp => exp.value)}</p>

                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Qualifications: </span> {qualifications}</p>
                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Key skills: </span> {skills.join(', ')}</p>
                        <p className=""><span className='border-b-2 border-cyan-300 font-semibold'>Available Time:</span> {availableTime} Hrs.</p>
                        <p className=""><span className='border-b-2 border-cyan-300 font-semibold'>My Classes:</span> {slotName}</p>
                    </div>
                    <div className='my-5 bg-white border-2 border-black p-2 rounded-xl'>
                        <h1 className='text-center border-b-2 mb-4 p-1 border-black font-bold'>Your knowledge: </h1>

                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Question: </span> {trainingPrograms.map(exp => exp.value)}</p>
                        <p className=""> <span className='border-b-2 border-cyan-300 font-semibold'>Answer: </span> {trainingInfo}</p>
                    </div>
                    <div className='my-5 bg-white border-2 border-black p-2 rounded-xl'>

                        <p className=""><span className='border-b-2 border-cyan-300 font-semibold'>How we can upgrade our self: </span> {otherInfo}</p>
                    </div>
                </div>
            </div>
            <BeATrainer />


        </>
    );
}

export default TrainerDetails
