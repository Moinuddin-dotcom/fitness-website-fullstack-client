import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosPublic from './useAxiosPublic'

const useReviews = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { user } = useAuth()
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        // enabled: !!user,
        queryFn: async () => {
            const response = await axiosSecure('/reviews')
            return response.data
        }
    })
    return [reviews, isLoading]
}

export default useReviews
