import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'

const useTrainers = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    // console.log(loading)
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainer', user?.email],
        // enabled: !loading && !!user?.email && !localStorage.getItem('access-token'),
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/all-trainers/role?role=trainer`)
            console.log(data)
            return data
        }
    })
    console.log(trainers)
    return [trainers, isLoading]
}

export default useTrainers
