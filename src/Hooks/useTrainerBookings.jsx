import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { useParams } from 'react-router-dom';


const useTrainerBookings = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const { data: trainerBookings = [], isLoading: trainerBookingsLoading } = useQuery({
        queryKey: ['trainerBookings', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/trainer-bookings/${id}`)
            return data
        }
    })
    return [trainerBookings, trainerBookingsLoading]
}

export default useTrainerBookings
