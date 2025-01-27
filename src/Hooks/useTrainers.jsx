import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useTrainers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainer'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/all-trainers/role?role=trainer`)
            // console.log(data)
            return data
        }
    })
    // console.log(trainers)
    return [trainers, isLoading]
}

export default useTrainers
