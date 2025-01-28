import React from 'react';
import { Button } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddNewClass = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    console.log(user)

    const onSubmit = async (data) => {
        console.log('Submitted Data:', data);

        const imageFile = { image: data.image[0] }
        const response = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        })

        try {
            if (response.data.success) {
                const classData = {
                    addedby: user?.displayName,
                    addedby_email: user?.email,
                    className: data.className,
                    image: response.data.data.url,
                    otherInfo: data.otherInfo
                }
                console.log(classData)
                const { data: res } = await axiosSecure.post('/classes', classData)
                console.log(res)
                if (res.insertedId) {
                    toast.success("A New class added successfully")
                    reset()
                } else {
                    toast.error("An error occurred while adding a new class")
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while adding a new class", error.message)
        }
    }
    return (
        <div className='max-w-[80vw] mx-auto my-10 bg-white/5 p-5 rounded-lg shadow-xl shadow-yellow-900 border-t-2 border-yellow-900'>
            <Helmet>
                <title>Dashboard | Add New Class | Aura Fusion Gym</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                    <div className="mb-4">
                        <label className="block text-md font-medium text-white">Class name: </label>
                        {/* Name */}
                        <input
                            type="text"
                            {...register("className", { required: 'Class name is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 text-white  rounded-md"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium text-white">Profile Image: </label>
                        <input
                            type="file"
                            {...register("image", { required: 'Profile Image is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Other Info</label>
                    <textarea
                        {...register('otherInfo')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 text-white rounded-md"
                    />
                </div>


                <div className="mb-4 text-center">
                    <Button type="submit" className="inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white w-1/3 ">
                        Add Class
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNewClass
