import React from 'react'
import { useForm } from 'react-hook-form';
import googleLogo from '../../../../src/assets/images/Google-logo.png'
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <div className="flex max-w-[80vw] mx-auto min-h-screen bg-black text-white p-10">
                {/* Left Panel */}
                <div className="flex-1 bg-gradient-to-br from-purple-700 to-black p-12 flex flex-col justify-center items-center rounded-l-xl">
                    <h1 className="text-4xl font-bold mb-4">Aura Fusion Gym</h1>
                    <p className="text-2xl mb-6">Get Started with Us</p>
                    <p className="text-center mb-10">
                        Complete these easy steps to register your account.
                    </p>
                    <div className="flex flex-col gap-4">
                        <button className="bg-white text-black py-2 px-6 rounded-full">1. Sign up your account</button>
                        <button className="bg-gray-700 py-2 px-6 rounded-full">2. Set up your workspace</button>
                        <button className="bg-gray-700 py-2 px-6 rounded-full">3. Set up your profile</button>
                    </div>
                </div>


                {/* Right Panel */}
                <div className="flex-1 flex flex-col justify-center px-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up Account</h2>
                    <p className="mb-8 text-center">Enter your personal data to create your account.</p>

                    <div className="flex gap-4 mb-6">
                        <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                            <img src={googleLogo} alt="google icon" className='h-8' />
                            <span>Google</span>
                        </button>
                    </div>
                    <div className="divider divider-accent">OR</div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* First Name */}
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        {/* Photo URL */}
                        <input
                            type='text'
                            {...register("PhotoURL", { required: "Photo is required" })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Photo URL"
                        />
                        {errors.PhotoURL && <p className="text-red-500">{errors.PhotoURL.message}</p>}
                        {/* Email */}
                        <input
                            {...register("email", { required: "Email is required" })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        {/* Password */}
                        <input type="password" placeholder="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
                        })} name='password' className=" w-full bg-gray-800 text-white py-2 px-4 rounded" required />

                        {errors.password?.type === "required" && (
                            <p className='text-red-700' role="alert">Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className='text-red-700' role="alert">Minimum 6 character required</p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className='text-red-700' role="alert">Password must have one uppercase one lower case one special character one number</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-white text-black py-2 px-4 rounded mt-4 font-bold"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-gray-500 mt-4 text-center">
                        Already have an account? <Link to={'/login'} className="text-white">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
