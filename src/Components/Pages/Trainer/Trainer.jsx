import React, { useEffect, useState } from 'react'
import TrainerCard from './TrainerCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';





const Trainer = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { data: trainers = [] } = useQuery({
        queryKey: ['trainer'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/all-trainers/role?role=trainer`)
            console.log(data)
            return data
        }
    })
    console.log(trainers)

    return (
        <div className="max-w-[80vw] mx-auto shadow-xl shadow-white rounded-xl grid grid-cols-3 my-10">
            {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
            ))}
        </div>
    )
}

export default Trainer
