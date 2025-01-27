import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useSubscribers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: subscribers = [], isLoading:subscribersLoading  } = useQuery({
        queryKey: ['subscribers'],
        queryFn: async () => {
            const { data } = await axiosSecure('/subscribers')
            // console.log(data)
            return data
        }
    })
    console.log(subscribers)
    return [subscribers, subscribersLoading]
}

export default useSubscribers
