import React from 'react'
import useUser from '../../../../Hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import Loading from '../../Loading'
// import { Card } from "flowbite-react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import ModalOfReview from './ModalOfReview'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';

const BookedTrainer = () => {

    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }
    const [users, isLoading] = useUser()
    const axiosSecure = useAxiosSecure()
    const { data: bookedTrainerData = [], isLoading: bookedTrainerDataLoading } = useQuery({
        queryKey: ['bookedTrainerData', users?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/payment-info/${users?.email}`)
            return data
        },
    })
    if (isLoading || bookedTrainerDataLoading) return <Loading />

    const { bookingUserEmail, bookingUserName, date, packageName,
        price, trainerInfo, transactionId
    } = bookedTrainerData || {}

    return (
        // <div className='max-w-[80vw] mx-auto my-16'>
        //     {(bookedTrainerData && bookedTrainerData.length > 0) ?  <>
        //             <div className='text-center'>
        //                 <h1 className='text-2xl font-semibold'>You didn't booked any trainer.</h1>
        //                 <span> See Our trainers<Link to={'/trainer'} className='text-blue-500 underline underline-offset-2 ml-2'>Trainers</Link></span>
        //             </div>
        //         </> :
        //         <>
        //             <Card color="transparent" shadow={false} className=" bg-white max-w-[70vw] mx-auto p-5">
        //                 <CardHeader
        //                     color="transparent"
        //                     floated={false}
        //                     shadow={false}
        //                     className="mx-0 flex items-center gap-4 pt-0 pb-8"
        //                 >
        //                     <div className="flex w-full flex-col gap-0.5">
        //                         <div className="flex items-center justify-between">
        //                             <Typography variant="h5" color="blue-gray">
        //                                 Trainer Name: {trainerInfo?.trainerName}
        //                             </Typography>
        //                             <div className="5 flex items-center gap-0">
        //                                 {/* Modal data */}

        //                                 <Button
        //                                     onClick={open}
        //                                     className="rounded-md bg-black py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        //                                 >
        //                                     Give a review
        //                                 </Button>
        //                                 <ModalOfReview isOpen={isOpen} close={close} />
        //                                 {/* Modal data */}
        //                             </div>
        //                         </div>
        //                         <Typography color="blue-gray">Trainer Email: {trainerInfo?.trainerEmail} </Typography>
        //                         <Typography color="blue-gray">Booked for: <strong>{trainerInfo?.slotName}</strong> </Typography>
        //                     </div>
        //                 </CardHeader>
        //                 <Divider />
        //                 <CardBody className="mb-6 p-0">
        //                     <Typography variant="h5" color="blue-gray">
        //                         Your Name: {bookingUserName}
        //                     </Typography>
        //                     <Typography color="blue-gray">Your Email: {bookingUserEmail} </Typography>
        //                     <Divider />

        //                     <Typography variant="h5" color="blue-gray" className='mt-5'>
        //                         Package Information:
        //                     </Typography>
        //                     <Typography color="blue-gray">Package Name: <strong>{packageName}</strong> </Typography>
        //                     <Typography color="blue-gray">Package Price: <strong>{price}$</strong> </Typography>
        //                     <Typography color="blue-gray">Activation Date: <strong>{date}</strong></Typography>
        //                     <Typography color="blue-gray">Payment status: <strong>{transactionId ? " Successfully" : "Pending"}</strong> </Typography>
        //                 </CardBody>
        //             </Card>
        //         </>
        //     }
        // </div>

        <div className='max-w-5xl mx-auto my-16'>
            {bookedTrainerData && bookedTrainerData.length === 0 ? (
                <div className='text-center'>
                    <h1 className='text-4xl font-semibold text-gray-900 mb-4'>
                        You haven't booked any trainer yet.
                    </h1>
                    <span className='text-lg text-gray-600'>
                        Explore our trainers{' '}
                        <Link to='/trainer' className='text-blue-600 font-medium underline'>
                            here.
                        </Link>
                    </span>
                </div>
            ) : (
                <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
                    {/* Trainer Info Section */}
                    <div className='px-6 py-4 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center justify-center bg-blue-600 text-white rounded-full p-3'>

                                </div>
                                <Typography variant='h5' color='blue-gray' className='text-xl text-black font-semibold'>
                                    {trainerInfo?.trainerName}
                                </Typography>
                            </div>
                            <div className='hidden md:flex gap-2'>
                                <Button
                                    onClick={open}
                                    className='bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-300'
                                >
                                    Give a review
                                </Button>
                                <ModalOfReview isOpen={isOpen} close={close} />
                            </div>
                        </div>
                        <div className='mt-2 text-black'>
                            <Typography color='blue-gray'>Trainer Email: {trainerInfo?.trainerEmail}</Typography>
                            <Typography color='blue-gray'>
                                Booked for: <strong>{trainerInfo?.slotName}</strong>
                            </Typography>
                        </div>
                    </div>

                    {/* Divider */}
                    <Divider className="mx-6 my-4" />

                    {/* Booking Info Section */}
                    <div className='px-6 py-4'>
                        <div className='bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg shadow-md'>
                            <Typography variant='h5' color='blue-gray' className='text-lg text-black font-semibold'>
                                Your Booking Information
                            </Typography>
                            <Typography color='blue-gray' className='text-black'>
                                Name: <strong>{bookingUserName}</strong>
                            </Typography>
                            <Typography color='blue-gray' className='text-black'>
                                Email: <strong>{bookingUserEmail}</strong>
                            </Typography>
                        </div>

                        <Divider className="my-4" />

                        {/* Package Info Section */}
                        <div className='bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-4 rounded-lg shadow-md'>
                            <Typography variant='h5' color='blue-gray' className='text-lg font-semibold text-black'>
                                Package Information
                            </Typography>
                            <Typography color='blue-gray' className='text-black'>
                                Package: <strong>{packageName}</strong>
                            </Typography>
                            <Typography color='blue-gray' className='text-black'>
                                Price: <strong>{price}$</strong>
                            </Typography>
                            <Typography color='blue-gray' className='text-black'>
                                Activation Date: <strong>{date}</strong>
                            </Typography>
                            <Typography color='blue-gray' className='text-black'>
                                Payment Status: <strong>{transactionId ? 'Successfully' : 'Pending'}</strong>
                            </Typography>
                        </div>
                    </div>
                    <div className='flex md:hidden justify-center'>
                        <Button
                            onClick={open}
                            className='bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-300'
                        >
                            Give a review
                        </Button>
                        <ModalOfReview isOpen={isOpen} close={close} />
                    </div>

                    {/* Footer Section */}
                    <div className='text-center py-4 bg-gray-50'>
                        <Typography color='gray' className='text-sm'>
                            Need help? Contact our support team anytime.
                        </Typography>
                    </div>
                </div>
            )}
        </div>



    )
}

export default BookedTrainer


