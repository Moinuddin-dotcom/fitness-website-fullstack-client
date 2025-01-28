import { Button } from '@headlessui/react';
import React from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form';
import useUser from '../../../../../Hooks/useUser';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Loading from '../../../Loading';
import { Divider } from '@mui/material';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddForum = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [users, isLoading] = useUser()
    // console.log(users)
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();



    const onSubmit = async (data) => {
        console.log('Submitted Data:', data);

        const imageFile = { image: data.image[0] }
        const response = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        })

        try {
            if (response.data.success) {
                const forumData = {
                    title: data.title,
                    blogImage: response.data.data.url,
                    tipsImage: response.data.data.url,
                    nutritionImage: response.data.data.url,
                    addedbyId: users?._id,
                    addedbyName: users?.name,
                    addedbyEmail: users?.email,
                    addedbyPhoto: users?.photo,
                    addedbyRole: users?.role,
                    createdAt: new Date().toISOString(),
                    tipsDescription: data.tipsAndTechniques,
                    // nutritionDescription: data.nutritionAndDietAdvice,
                    descriptionOfBlog: data.descriptionOfBlog,
                    tipsAndTechniquesTitle: data.tipsAndTechniquesTitle,
                    nutritionAndDietAdviceTitle: data.nutritionAndDietAdviceTitle,
                    nutritionAndDietAdviceDescription: data.nutritionAndDietAdviceDescription,
                    upVote: "",
                    downVote: ""
                    // updatedAt: new Date().toISOString(),
                }
                console.log(forumData)
                const { data: postBlog } = await axiosSecure.post('/blogs', forumData)
                console.log(postBlog)
                if (postBlog.insertedId) {
                    toast.success("Blog posted successfully")
                    reset()
                } else {
                    toast.error("An error occurred while posting a blog")
                }
            }
        } catch (error) {
            console.log(error.message)
        }
        if (isLoading) return <Loading />
    }
    return (
        <div className='max-w-[80vw] mx-auto my-10 bg-white/5 p-5 rounded-lg shadow-xl shadow-yellow-900 border-t-2 border-yellow-900'>
            <Helmet>
                <title>Dashboard | Add Forum | Aura Fusion Gym</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-xl font-semibold mb-5 text-center underline'> Add Forum</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                    <div className="mb-4">
                        <label className="block text-md font-medium text-white">Bloge title: </label>
                        {/* Title */}
                        <input
                            type="text"
                            {...register("title", { required: 'Blog Title is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-yellow-900 bg-black/20 text-white  rounded-md"

                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium text-white">Blog Image: </label>
                        {/* Profile image */}
                        <input
                            type="file"
                            // defaultValue={user?.photoURL}
                            {...register("image", { required: 'Profile Image is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-yellow-900 rounded-md "
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>
                </div>
                {/* <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>

                    
                </div> */}
                <Divider />
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                    <div className='border p-5 bg-yellow-900 rounded-lg my-10'>
                        <div className="mb-4">
                            <label className="block text-md font-medium text-black">Tips and Techniques Image(Optional): </label>
                            {/* Tips and Techniques image */}
                            <input
                                type="file"
                                {...register("tipsAndTechniquesImage",)}
                                className="mt-1 block w-full px-3 py-2 border border-yellow-900 rounded-md "
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black">Tips and Techniques Title: </label>
                            {/* Tips and Techniques Title */}
                            <input
                                type="text"
                                {...register("tipsAndTechniquesTitle", { required: 'Blog Title is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-yellow-900 bg-black/20 text-white  rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black">Tips and Techniques Description: </label>
                            {/* Tips and Techniques Description */}
                            <textarea
                                {...register('tipsAndTechniques')}
                                className="mt-1 block w-full px-3 py-2 border border-yellow-900 bg-black/20 text-black rounded-md"
                            />
                        </div>
                    </div>
                    <div className='border p-5 bg-yellow-900 rounded-lg my-10'>
                        <div className="mb-4">
                            <label className="block text-md font-medium text-black">Nutrition and Diet Advice Image(Optional): </label>
                            {/* Nutrition and Diet Advice image */}
                            <input
                                type="file"
                                {...register("nutritionAndDietAdviceImage",)}
                                className="mt-1 block w-full px-3 py-2 border border-yellow-900 rounded-md "
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black">Nutrition and Diet Advice Title: </label>
                            {/* Nutrition and Diet Advice Title */}
                            <input
                                type="text"
                                {...register("nutritionAndDietAdviceTitle", { required: 'Blog Title is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-yellow-900 bg-black/20 text-white  rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black">Nutrition and Diet Advice Description: </label>
                            {/* Nutrition and Diet Advice Description */}
                            <textarea
                                {...register('nutritionAndDietAdviceDescription')}
                                className="mt-1 block w-full px-3 py-2 border border-yellow-900 bg-black/20 text-black rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Description: </label>
                    {/* otherInfo */}
                    <textarea
                        {...register('descriptionOfBlog')}
                        className="mt-1 block w-full px-3 py-2 border  border-yellow-900 bg-black/20 text-white rounded-md"
                    />
                </div>


                <div className="mb-4 text-center">
                    <Button type="submit" className="inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white w-1/3 ">
                        Add Forum
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddForum
