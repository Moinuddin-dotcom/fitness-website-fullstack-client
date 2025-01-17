import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { isLoading, data: users } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get('/users')
            // console.log(response.data)
            return response.data
        }
    })
    // if (isPending) return 'Loading...'

    return [isLoading, users]
}

export default useUser
