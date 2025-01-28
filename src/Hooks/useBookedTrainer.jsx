import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth"


const useBookedTrainer = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: bookedData = [], isLoading } = useQuery({
        queryKey: ['bookedData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book-trainer?bookedUserEmail=${user?.email}`)
          
            return res.data
        }
    })
    return [bookedData, isLoading]
}

export default useBookedTrainer

