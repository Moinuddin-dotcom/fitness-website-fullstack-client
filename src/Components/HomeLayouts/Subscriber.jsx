
import React from 'react'
import subscribeImage from '../../../src/assets/images/subscribe-image.png'

import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import SectionTitles from '../SharedMarque/SectionTitles';

const Subscriber = () => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const subscriberInfo = {
            name: data.name,
            email: data.email
        }
        await axiosPublic.post('/subscribers', subscriberInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    toast.success("Subscribed successfully")
                    reset()
                }
                if (res.data.insertedId === null) {
                    toast.error("All ready Subscribed")
                    reset()
                }
            })
    }

    return (
        <>
            <SectionTitles subHeading={'Get Notification'} heading={'Subscribe'} />
            <div className="flex items-center justify-center min-h-screen py-16">
                <div className="bg-white rounded-lg shadow-lg w-full md:max-w-[90vw] lg:max-w-[50vw] h-96 overflow-hidden">
                    <div className="grid grid-cols-2 ">
                        <div className='hidden md:flex'>
                            <img src={subscribeImage} className=' h-96' alt="" />
                        </div>
                        <div className=" md:p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 ">HEY, WAIT...</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Subscribe to our newsletter and never miss our latest news and promotions.
                                <br />
                                Our newsletter is sent once a week, every Tuesday.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">

                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                                    placeholder="Your Name"
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                {/* Email */}
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                                    placeholder="Email"
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                <button
                                    type="submit"
                                    className=" bg-[#82b440] text-white py-2 px-4 rounded-full mt-4 font-bold"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscriber
