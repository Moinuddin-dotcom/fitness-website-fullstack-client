import React from 'react'
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import PaymentCard from './Payment/PaymentCard';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading';
import useClasses from '../../../../Hooks/useClasses';
import { Button } from '@headlessui/react';
import useUser from '../../../../Hooks/useUser';




const TrainerBookedPage = () => {
    const { id, exp } = useParams();
    const axiosSecure = useAxiosSecure()
    const [users,] = useUser()


    const { data: trainerBookings, isLoading: trainerBookingsLoading } = useQuery({
        queryKey: ['trainerBookings', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/trainer-bookings/${id}`)
         
            return data
        }
    })


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
        <div className=''>
            <div className='max-w-[50vw] mx-auto flex flex-col justify-center items-center'>
                <h1 className="text-xl font-bold">Booking Trainer</h1>
                <h1>Trainer Name: {usersData.name}</h1>
                <p>Booking for <strong>{exp}</strong> Day</p>
                {
                    trainerBookings.map(trainrerDetails =>
                        <div key={trainrerDetails._id}>
                            <div className='border bg-green-500 w-full text-center px-16 py-1 rounded-full mt-2'>{trainrerDetails.className}</div>
                        </div>
                    )
                }
            </div>

            {/* PaymentCard */}
            <div className='bg-white/10 p-4 rounded-lg shadow-lg'>
                <h1 className='text-4xl text-center font-semibold my-8'>Choose Any MemberShip Plan</h1>
                <PaymentCard trainerInfo={trainerInfo} />
            </div>
            {/* PaymentCard */}
        </div>
    )
}

export default TrainerBookedPage
