import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const usePayment = () => {
    const axiosSecure = useAxiosSecure()
    const { data: paymentData = [], isLoading } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const { data } = await axiosSecure('/payments')
            return data
        }
    })
    return [paymentData, isLoading]
}

export default usePayment
