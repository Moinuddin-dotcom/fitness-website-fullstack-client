import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useLoggedUser = () => {
    const axiosSecure = useAxiosSecure()
    const { data: loggedUser = null, isLoading } = useQuery({
        queryKey: ['loggedUser'],
        queryFn: async () => {
            const token = localStorage.getItem('access-token');

            const { data } = await axiosSecure.get('/logedInUser', {
                headers: { authorization: `Bearer ${token}` },
            });
            // console.log(data)
            return data;
        }
    })
    return [loggedUser, isLoading]
}

export default useLoggedUser
