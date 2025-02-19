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


