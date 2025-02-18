import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";


import {
    Card,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { Button } from '@headlessui/react';

const TrainerCard = ({ trainer }) => {
    const { name, image, role, experience, availableDays, age, _id } = trainer;
    const [isHovered, setIsHovered] = useState(false);
    return (
       
        <div className=" p-4 shadow-md bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className="space-y-4">
                <div className="space-y-2 relative">
                    {/* <img src={image} alt="Trainer Photo" className="block object-cover object-center w-full rounded-md h-72 bg-gray-500 dark:bg-gray-500" /> */}
                    <div className="relative overflow-hidden rounded-md">
                        <div className='flex justify-center'>

                            <img
                                src={image}
                                alt="Trainer"
                                className="block object-cover object-center w-fit rounded-md h-72 bg-gray-500 dark:bg-gray-500"
                            />
                        </div>
                        <div
                            className={`absolute bottom-0 left-0 right-0 flex justify-center gap-4 bg-black bg-opacity-50 py-3 
                                transform ${isHovered ? "translate-y-0" : "translate-y-full"} transition-transform duration-300`}
                        >
                            <a href="#" className="text-white text-xl hover:text-[#91edb1]"><FaFacebook /></a>
                            <a href="#" className="text-white text-xl hover:text-[#91edb1]"><FaTwitter /></a>
                            <a href="#" className="text-white text-xl hover:text-[#91edb1]"><FaLinkedin /></a>
                            <a href="#" className="text-white text-xl hover:text-[#91edb1]"><FaInstagram /></a>
                        </div>
                    </div>
                    <div className="flex justify-between pb-4 border-bottom">
                        <div className='bg-blue-200 flex justify-center items-center gap-1 px-6 py-1 rounded-badge text-gray-800 font-semibold' >Age:{age} </div>
                        <div className='bg-green-300 flex justify-center items-center gap-1 px-2 py-1 rounded-badge text-gray-800 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <span>verified</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-[#91edb1]">{name} <strong>({role})</strong></h3>
                    <p className="leading-snug text-gray-400 dark:text-gray-600">{experience.map((exp, idx) => <p key={idx}>{exp.value} years of exp..</p>)}</p>

                </div>
                <div className="space-y-2">
                    <p className="leading-snug text-gray-400 dark:text-gray-600">Meet me on: <strong>{availableDays.map(day => day.value).join(', ')}</strong> </p>

                </div>
                <div className="divider"></div>
                <Link to={`/trainerDetails/${_id}`} >
                    <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-[#91edb1] hover:bg-[#91edb1] text-white shadow-2xl hover:shadow-[#91edb1]">Know more</button>
                </Link>
            </div>
        </div>
    );
};

export default TrainerCard;
