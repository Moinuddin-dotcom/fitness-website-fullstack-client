import React from 'react'
// import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'


const useClasses = () => {
    // const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { data: adminClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['adminClasses'],
        queryFn: async () => {
            const { data } = await axiosPublic('/classes')

            return data
        }
    })

    return [adminClasses, isLoading, refetch]
}

export default useClasses
