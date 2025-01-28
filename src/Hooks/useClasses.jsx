import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'


const useClasses = () => {
    const axiosSecure = useAxiosSecure()
    const { data: adminClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['adminClasses'],
        queryFn: async () => {
            const { data } = await axiosSecure('/classes')
           
            return data
        }
    })

    return [adminClasses, isLoading, refetch]
}

export default useClasses
