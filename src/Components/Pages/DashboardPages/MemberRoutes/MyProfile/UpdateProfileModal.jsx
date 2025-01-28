import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Loading from '../../../Loading'
import useUser from '../../../../../Hooks/useUser'
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateProfileModal = ({ isOpen, close }) => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [users, isLoading] = useUser()
    if (isLoading) return <Loading />
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const response = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        })


        try {
            if (response.data.success) {
                const updateInfo = {
                    name: data.name,
                    email: data.email,
                    image: response.data.data.url,
                    parmanentAddress: data.permanentAddress,
                    presentAddress: data.presentAddress
                }
                const { data: updateData } = await axiosSecure.patch(`/update-user-info/${users?.email}`, updateInfo)

                if (updateData.modifiedCount > 0) {
                    toast.success('Profile updated successfully!');
                    close();
                    reset();
                    refetch();
                }
            }
        } catch (error) {
            toast.error('Failed to update profile.', error);
        }
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-3xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-white text-center">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                                    <div className="mb-4">
                                        {/* First Name */}
                                        <label className="block text-md font-medium text-white">Update Your Name: </label>
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-md font-medium text-white">Profile Image: </label>
                                        {/* Profile image */}
                                        <input
                                            type="file"
                                            // defaultValue={user?.photoURL}
                                            {...register("image")}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md "
                                        />
                                        {/* {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>} */}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-md font-medium text-white">Your Email: </label>
                                    {/* Email */}
                                    <input
                                        type='email'
                                        defaultValue={users?.email}
                                        {...register("email")}
                                        readOnly
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"

                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-white">Present Address:</label>
                                        {/* Present */}
                                        <textarea
                                            {...register('presentAddress')}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 text-black rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-white">Permanent Address:</label>
                                        {/* Permanent */}
                                        <textarea
                                            {...register('permanentAddress')}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 text-black rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        className="inline-flex  items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"

                                    >
                                        Update <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>

                                    </Button>
                                </div>
                            </form>
                        </DialogTitle>


                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default UpdateProfileModal
