import React from 'react';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';



import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Chip,
} from "@material-tailwind/react";
import { Button } from '@headlessui/react';

const TrainerCard = ({ trainer }) => {
    const { name, image, role, experience, availableDays, _id } = trainer;

    return (
        // <div className="relative max-w-sm border rounded-lg shadow-lg overflow-hidden m-4 group">
        //     {/* Image */}
        //     <img className="w-full h-48 object-cover" src={profileImage} alt={name} />

        //     {/* Social Icons (hidden by default, visible on hover) */}
        //     <div className="absolute top-1/3 -left-10 transform -translate-y-1/2 group-hover:left-4 transition-all duration-500">
        //         <div className="flex flex-col space-y-2">
        //             <a href={socialIcons.facebook} target="_blank" rel="noopener noreferrer">
        //                 <img
        //                     src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
        //                     alt="Facebook"
        //                     className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
        //                 />
        //             </a>
        //             <a href={socialIcons.twitter} target="_blank" rel="noopener noreferrer">
        //                 <img
        //                     src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
        //                     alt="Twitter"
        //                     className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
        //                 />
        //             </a>
        //             <a href={socialIcons.linkedin} target="_blank" rel="noopener noreferrer">
        //                 <img
        //                     src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        //                     alt="LinkedIn"
        //                     className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
        //                 />
        //             </a>
        //         </div>
        //     </div>

        //     {/* Card Content */}
        //     <div className="p-6 text-center">
        //         <h2 className="font-bold text-lg ">{name}</h2>
        //         <p className="text-gray-600">Experience: {experience}</p>
        //         <p className="text-gray-500">Available Slots: {availableSlots}</p>
        //     </div>
        // </div>
        <Card className="w-96 p-4">
            <CardHeader floated={false} className=" mt-0 ">
                <img src={image} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
                <div className='flex justify-between'>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {name}
                    </Typography>
                    {/* <Chip size="sm" value="chip small" className='bg-black' /> */}
                    {/* <Chip color="green" value="green" className='py-0' /> */}
                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        {experience.map((exp, idx) => <p key={idx}>{exp.value}</p>)}
                    </Button>
                </div>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    Hi! I am a <strong>{role}</strong>
                </Typography>
                <Typography color="blue-gray" className="font-medium flex" textGradient>
                    <span className='mr-4'>I am available:</span>
                    {availableDays.map(day => day.value).join(', ')}
                    {/* {role} */}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
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

            </CardFooter>
            <div className="text-center">
                <Link to={`/trainerDetails/${_id}`} >
                    <Button size="sm" variant="text" className="flex items-center gap-2">
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
