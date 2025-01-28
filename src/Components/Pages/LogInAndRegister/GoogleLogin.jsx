import React from 'react'
import googleLogo from '../../../../src/assets/images/Google-logo.png'
import useAuth from '../../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAxiosPublic from '../../../Hooks/useAxiosPublic'

const GoogleLogin = () => {
    const { googleLogin } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const handleGoogle = () => {
        googleLogin()
            .then(res => {
                const userInfo = {
                    email: res.user.email,
                    name: res.user.displayName,
                    photoURL: res.user.photoURL,
                    role: "member",
                    status: " "
                }

                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            toast.success("User log in successfully")

                        }
                    })
                navigate('/')
            })
            .catch(err => {
                toast.log(err.message)
            })
    }

    return (
        <div>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={handleGoogle}
                    className="flex-1 bg-gray-800 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                    <img src={googleLogo} alt="google icon" className='h-8' />
                    <span>Google</span>
                </button>
            </div>
        </div>
    )
}

export default GoogleLogin
