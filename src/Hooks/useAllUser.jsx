import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useAllUser = () => {
    const axiosPuplic = useAxiosPublic()
    // const { user } = useAuth()
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosPuplic(`/users`)
            // console.log(response.data)
            return response.data
        }
    })
    // if (isPending) return 'Loading...'

    return [users, isLoading]

}

export default useAllUser
