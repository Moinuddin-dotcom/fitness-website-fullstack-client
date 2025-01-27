import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const response = await axiosSecure(`/users/singleUser/${user?.email}`)
            // console.log(response.data)
            return response.data
        }
    })
    // if (isPending) return 'Loading...'

    return [users, isLoading, refetch]
}

export default useUser
