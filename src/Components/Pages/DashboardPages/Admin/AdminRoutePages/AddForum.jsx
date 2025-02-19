import { Button } from '@headlessui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import useUser from '../../../../../Hooks/useUser';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Loading from '../../../Loading';
import { Divider } from '@mui/material';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddForum = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [users, isLoading] = useUser();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const response = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });

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
                    descriptionOfBlog: data.descriptionOfBlog,
                    tipsAndTechniquesTitle: data.tipsAndTechniquesTitle,
                    nutritionAndDietAdviceTitle: data.nutritionAndDietAdviceTitle,
                    nutritionAndDietAdviceDescription: data.nutritionAndDietAdviceDescription,
                    upVote: "",
                    downVote: ""
                };
                const { data: postBlog } = await axiosSecure.post('/blogs', forumData);
                if (postBlog.insertedId) {
                    toast.success("Blog posted successfully");
                    reset();
                } else {
                    toast.error("An error occurred while posting a blog");
                }
            }
        } catch (error) {
            toast.error("An error occurred while posting a blog", error.message);
        }
        if (isLoading) return <Loading />;
    };

    return (
        <div className='max-w-4xl mx-auto my-10 bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-500'>
            <Helmet>
                <title>Dashboard | Add Forum | Aura Fusion Gym</title>
            </Helmet>
            <h1 className='text-2xl font-bold text-center text-white mb-6'>Add Forum</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className='block text-white font-semibold'>Blog Title:</label>
                        <input type='text' {...register("title", { required: 'Blog Title is required' })} 
                            className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                        {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className='block text-white font-semibold'>Blog Image:</label>
                        <input type='file' {...register("image", { required: 'Blog Image is required' })} 
                            className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                        {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
                    </div>
                </div>
                <Divider className='bg-yellow-500' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='p-4 bg-yellow-900 rounded-lg'>
                        <label className='block text-white font-semibold'>Tips & Techniques Title:</label>
                        <input type='text' {...register("tipsAndTechniquesTitle")} 
                            className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                        <label className='block text-white font-semibold mt-4'>Tips & Techniques Description:</label>
                        <textarea {...register("tipsAndTechniques")} 
                            className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                    </div>
                    <div className='p-4 bg-yellow-900 rounded-lg'>
                        <label className='block text-white font-semibold'>Nutrition & Diet Advice Title:</label>
                        <input type='text' {...register("nutritionAndDietAdviceTitle")} 
                            className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                        <label className='block text-white font-semibold mt-4'>Nutrition & Diet Advice Description:</label>
                        <textarea {...register("nutritionAndDietAdviceDescription")} 
                            className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                    </div>
                </div>
                <Divider className='bg-yellow-500' />
                <div>
                    <label className='block text-white font-semibold'>Description:</label>
                    <textarea {...register('descriptionOfBlog')} 
                        className='w-full px-4 py-2 mt-2 bg-gray-900 text-white border border-yellow-500 rounded-md' />
                </div>
                <div className='text-center'>
                    <Button type='submit' className='px-6 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600'>
                        Add Forum
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddForum;