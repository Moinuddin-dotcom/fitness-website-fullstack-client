import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'

const useBlog = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: blogData, isLoading: blogLoading } = useQuery({
        queryKey: ['blog'],
        // enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure('/blogs')
            return data
        }

    })
    return [blogData, blogLoading]
}

export default useBlog
