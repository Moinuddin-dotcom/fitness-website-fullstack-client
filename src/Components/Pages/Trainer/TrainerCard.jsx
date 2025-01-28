import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';



import {
    Card,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { Button } from '@headlessui/react';

const TrainerCard = ({ trainer }) => {
    const { name, image, role, experience, availableDays, _id } = trainer;

    return (
        <Card className=" relative overflow-hidden group border-4 bg-white text-black border-yellow-900 rounded-xl m-10 p-4 ">
          
            <div className='flex justify-center '>

                <img src={image} alt="profile-picture" className='rounded-lg w-full h-48 p-1 border border-fuchsia-800 shadow-md shadow-black' />
            </div>
            <div className='my-8'>
                <div className='flex flex-col justify-between items-center border-2  border-black p-2 rounded-lg rounded-b-none shadow-xl shadow-black '>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {name}
                    </Typography>
                    <div>

                        {experience.map((exp, idx) => <p key={idx}>{exp.value} years of exp..</p>)}
                    </div>
                </div>
                <div className=' bg-white border-2 border-black p-2 rounded-lg rounded-t-none shadow-md shadow-black'>

                    <Typography color="blue-gray" className="font-medium text-start" textGradient>
                        Hi! I am a <strong>{role}</strong>
                    </Typography>
                    <Typography color="blue-gray" className="font-medium flex" textGradient>
                        <span className='mr-4'>Available:</span>
                        <br />
                        <div>
                            {availableDays.map(day => day.value).join(', ')}
                        </div>
                       
                    </Typography>
                </div>
              
            </div>
            <div className="absolute top-1/4 -left-10 transform -translate-y-1/2 group-hover:left-4 transition-all duration-500">
                <div className="flex flex-col space-y-2">
                  
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

                    {/* </CardFooter> */}
                </div>
            </div>
            <div className="text-center">
                <Link to={`/trainerDetails/${_id}`} >
                    <Button size="sm" variant="text" className="flex items-center gap-2 hover:text-blue-500 hover:underline">
                        Know More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default TrainerCard;
