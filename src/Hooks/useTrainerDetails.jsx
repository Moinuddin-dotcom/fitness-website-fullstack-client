import React from 'react'
import { useParams } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTrainerDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const { data: trainerDetails = [], isLoading } = useQuery({
        queryKey: ['trainerDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/trainerDetails/${id}`)
            return data
        }
    })
    return [trainerDetails, isLoading]
}

export default useTrainerDetails
