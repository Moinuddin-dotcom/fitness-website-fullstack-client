import React from 'react'
// import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'


const useClasses = () => {
    // const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { data: adminClasses = [], isLoading, refetch } = useQuery({
        // queryKey: ['adminClasses', debouncedSearch],
        queryKey: ['adminClasses'],
        queryFn: async () => {
            // const { data } = await axiosPublic(`/classes?search=${debouncedSearch}`)
            const { data } = await axiosPublic(`/classes`)

            return data
        },
        // enabled: debouncedSearch !== undefined,
    })

    return [adminClasses, isLoading, refetch]
}

export default useClasses
