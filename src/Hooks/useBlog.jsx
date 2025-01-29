import React from 'react'
// import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosPublic from './useAxiosPublic'

const useBlog = () => {
    // const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data: blogData, isLoading: blogLoading } = useQuery({
        queryKey: ['blog'],
        // enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosPublic('/blogs')
            return data
        }

    })
    return [blogData, blogLoading]
}

export default useBlog
