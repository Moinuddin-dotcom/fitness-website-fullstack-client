import React from 'react'
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import PaymentCard from './Payment/PaymentCard';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading';
import useClasses from '../../../../Hooks/useClasses';
import { Button } from '@headlessui/react';
import useUser from '../../../../Hooks/useUser';
import useTrainerBookings from '../../../../Hooks/useTrainerBookings';
import { Helmet } from 'react-helmet';




const TrainerBookedPage = () => {
    const { id, exp } = useParams();
    const axiosSecure = useAxiosSecure()


    const [trainerBookings, trainerBookingsLoading] = useTrainerBookings()


    const { data: usersData, isLoading } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/single-trainer-data/${id}`)

            return data
        }
    })
    if (isLoading || trainerBookingsLoading) return <Loading />


    const trainerInfo = {
        trainerId: id,
        trainerName: usersData?.name,
        trainerEmail: usersData?.email,
        slotName: exp,
        // bookedUserName: users?.name
    }



    return (

        <div className='md:max-w-[95vw] lg:max-w-[80vw] mx-auto my-10 px-2 bg-white/10 rounded-lg shadow-lg'>
            <Helmet>
                <title>Membership Plans | Aura Fusion Gym</title>
            </Helmet>
            <div className='text-center space-y-3'>
                <h1 className="text-xl md:text-2xl lg:text-4xl text-black dark:text-white font-bold">Booking Trainer</h1>
                <h1 className='text-black dark:text-white'>Trainer Name: <span className='font-semibold'>{usersData.name}</span></h1>
                <p className='text-black dark:text-white'>Booking for <strong>{exp}</strong> Day</p>
                <div className='max-w-md mx-auto'>
                    {
                        trainerBookings.map(trainerDetails => (
                            <div key={trainerDetails._id} className='bg-green-500 text-white text-center px-6 py-2 rounded-full mt-2'>
                                {trainerDetails.className}
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* PaymentCard Section */}
            <div className='mt-10'>
                <h1 className='text-xl md:text-3xl lg:text-4xl  text-black dark:text-white text-center font-semibold mb-6'>Choose Any Membership Plan</h1>
                <PaymentCard trainerInfo={trainerInfo} />
            </div>
        </div>
    )
}

export default TrainerBookedPage
