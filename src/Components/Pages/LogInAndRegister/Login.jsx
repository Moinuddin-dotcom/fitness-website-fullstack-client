import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import GoogleLogin from './GoogleLogin';
import { Button } from '@mui/material';

const Login = () => {
  const { signIn, setLoading } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const roleCredentials = {
    admin: { email: 'admin@gmail.com', password: 'Admin@12' },
    trainer: { email: 'tasfia@gmail.com', password: 'Tasfia@12' },
    member: { email: 'shakib@gmail.com', password: 'Shakib@12' },
  };

  const handleRole = (role) => {
    setEmail(roleCredentials[role].email)
    setPassword(roleCredentials[role].password)

    setValue('email', roleCredentials[role].email)
    setValue('password', roleCredentials[role].password)
  }


  const onSubmit = (data) => {

    signIn(data.email, data.password)
      .then(res => {
        const user = res.user
        toast.success("User log in successfully", user)
        // setLoading(true)
        navigate('/')
      })
      .catch(err => {
        toast.error("Error logged in user: ", err.message)
      })
  };
  return (
    <div>
      <Helmet>
        <title>Log In | Aura Fusion Gym</title>
      </Helmet>
      <div className="flex lg:max-w-[80vw] mx-auto min-h-screen dark:bg-black text-white p-5 md:p-10">

        {/* Left Panel */}
        <div className="flex-1 flex flex-col justify-center lg:px-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Log In Account</h2>
          <p className="mb-8 text-center text-black dark:text-white">Enter your email & password.</p>
          {/* social log in */}
          <GoogleLogin />

          <div className="divider divider-accent text-black dark:text-white">OR</div>
          <div className=' my-2 text-center'>
            <h1 className='text-black dark:text-white pb-2'>Role wise Email & Password</h1>
            <div className='flex flex-col md:flex-row justify-center gap-4'>

            <Button onClick={() => handleRole('admin')} variant="contained">Admin</Button>
            <Button onClick={() => handleRole('trainer')} variant="contained">Trainer</Button>
            <Button onClick={() => handleRole('member')} variant="contained">Member</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <input
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              {...register("email", { required: "Email is required" })}
              defaultValue={email}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Password */}
            <input
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" },
              })}
              type="password"
              defaultValue={password}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full bg-white text-black py-2 px-4 rounded mt-4 font-bold"
            >
              Log in
            </button>
          </form>

          <p className="mt-4 text-center text-black dark:text-white">
            Create an account? <Link to={'/register'} className="text-green-600 font-semibold">Register</Link>
          </p>
        </div>
        {/* Right Panel */}
        <div className="hidden bg-gradient-to-br from-purple-700 to-black p-12 lg:flex flex-col justify-center items-center rounded-r-xl lg:w-[30vw] xl:w-[35vw]">
          <h1 className="text-4xl font-bold mb-4">Hello, <br /> Welcome Back</h1>
          <p className="text-2xl mb-6"></p>
          <p className="text-center mb-10">
            Complete these easy steps to login your account.
          </p>
          <div className="flex flex-col gap-4">
            <button className="bg-white text-black py-2 px-6 rounded-full">1. Give your registered email</button>
            <button className="bg-gray-700 py-2 px-6 rounded-full">2. Give your registered email passord</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


