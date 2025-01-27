import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useReviews = () => {
    const axiosSecure = useAxiosSecure()
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const response = await axiosSecure('/reviews')
            return response.data
        }
    })
    return [reviews, isLoading]
}

export default useReviews
