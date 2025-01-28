import axios from "axios"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosSecure = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token')
        if (token) {
            console.log("Resuest stopped by interceptor-->", token)
            config.headers.authorization = `Bearer ${token}`;
        } else {
            console.log("No token found in the interceptor")
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })



    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status
        console.log('Status error in the interceptor-->', status)
        if (status === 401 || status === 403) {
            await logout()
            navigate('/login')
        }
        return Promise.reject(error)
    }

    )
    return axiosSecure
}

export default useAxiosSecure

