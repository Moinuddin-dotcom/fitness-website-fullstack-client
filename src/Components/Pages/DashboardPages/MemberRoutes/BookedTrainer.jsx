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
    // console.log(users)
    const axiosSecure = useAxiosSecure()
    const { data: bookedTrainerData = [], isLoading: bookedTrainerDataLoading } = useQuery({
        queryKey: ['bookedTrainerData', users?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/payment-info/${users?.email}`)
            // console.log(res.data)
            return data
        },
    })
    if (isLoading || bookedTrainerDataLoading) return <Loading />
    console.log(bookedTrainerData)

    const { bookingUserEmail, bookingUserName, date, packageName,
        price, trainerInfo, transactionId
    } = bookedTrainerData || {}

    return (
        <div className='max-w-[80vw] mx-auto my-16'>
            {(bookedTrainerData && bookedTrainerData.length > 0) ?  <>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>You didn't booked any trainer.</h1>
                        <span> See Our trainers<Link to={'/trainer'} className='text-blue-500 underline underline-offset-2 ml-2'>Trainers</Link></span>
                    </div>
                </> :
                <>
                    <Card color="transparent" shadow={false} className=" bg-white max-w-[70vw] mx-auto p-5">
                        <CardHeader
                            color="transparent"
                            floated={false}
                            shadow={false}
                            className="mx-0 flex items-center gap-4 pt-0 pb-8"
                        >
                            <div className="flex w-full flex-col gap-0.5">
                                <div className="flex items-center justify-between">
                                    <Typography variant="h5" color="blue-gray">
                                        Trainer Name: {trainerInfo?.trainerName}
                                    </Typography>
                                    <div className="5 flex items-center gap-0">
                                        {/* Modal data */}

                                        <Button
                                            onClick={open}
                                            className="rounded-md bg-black py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                                        >
                                            Give a review
                                        </Button>

                                        <ModalOfReview isOpen={isOpen} close={close} />



                                        {/* Modal data */}
                                    </div>
                                </div>
                                <Typography color="blue-gray">Trainer Email: {trainerInfo?.trainerEmail} </Typography>
                                <Typography color="blue-gray">Booked for: <strong>{trainerInfo?.slotName}</strong> </Typography>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className="mb-6 p-0">
                            <Typography variant="h5" color="blue-gray">
                                Your Name: {bookingUserName}
                            </Typography>
                            <Typography color="blue-gray">Your Email: {bookingUserEmail} </Typography>
                            <Divider />

                            <Typography variant="h5" color="blue-gray" className='mt-5'>
                                Package Information:
                            </Typography>
                            <Typography color="blue-gray">Package Name: <strong>{packageName}</strong> </Typography>
                            <Typography color="blue-gray">Package Price: <strong>{price}$</strong> </Typography>
                            <Typography color="blue-gray">Activation Date: <strong>{date}</strong></Typography>
                            <Typography color="blue-gray">Payment status: <strong>{transactionId ? " Successfully" : "Pending"}</strong> </Typography>
                            {/* <Typography>
                            &quot;I found solution to all my design needs from Creative Tim. I use
                            them as a freelancer in my hobby projects for fun! And its really
                            affordable, very humble guys !!!&quot;
                        </Typography> */}
                        </CardBody>
                    </Card>
                </>
                
               

            }
        </div>
    )
}

export default BookedTrainer


