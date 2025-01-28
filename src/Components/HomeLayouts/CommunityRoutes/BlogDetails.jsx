import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Pages/Loading'
import { Divider } from '@mui/material'

const BlogDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

  
    const { data: singleBlog = {}, isLoading } = useQuery({
        queryKey: ['singleBlog', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/blogsById/${id}`)
            return data
        }
    })

    const { title,
        blogImage,
        tipsImage,
        nutritionImage,
        addedbyRole,
        createdAt,
        tipsDescription,
        descriptionOfBlog,
        tipsAndTechniquesTitle,
        nutritionAndDietAdviceTitle,
        nutritionAndDietAdviceDescription } = singleBlog

    if (isLoading) return <Loading />


    return (
        <div>

            <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-800 text-gray-100">
                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                    <img src={blogImage} alt="" className="w-full h-60 sm:h-96" />
                    <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
                        <div className="space-y-2">
                            <div className="inline-block text-2xl font-semibold sm:text-3xl">{title}</div>
                            <div className='flex justify-between'>
                                <p className="text-xs text-gray-400 ">Posted By
                                    <span rel="noopener noreferrer" className="text-xs hover:underline font-bold dark:text-cyan-400">{addedbyRole}</span>
                                </p>
                                <p className="text-xs text-gray-400 ">Posted At:
                                    <span rel="noopener noreferrer" className="text-xs hover:underline">{createdAt}</span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-100">
                                <h1 className='font-bold underline'> {tipsAndTechniquesTitle}:</h1>
                            </div>
                            <div className="text-gray-100">
                                {tipsDescription}
                            </div>
                            <img src={tipsImage} alt="" className="w-full h-60 sm:h-96" />
                        </div>
                        <Divider className='bg-gray-300' />
                        <div>
                            <div className="text-gray-100">
                                <h1 className='font-bold underline'> {nutritionAndDietAdviceTitle}:</h1>
                            </div>
                            <div className="text-gray-100">
                                {nutritionAndDietAdviceDescription}
                            </div>
                            <img src={nutritionImage} alt="" className="w-full h-60 sm:h-96" />
                        </div>
                        <Divider className='bg-gray-300' />
                        <div className="text-gray-100">
                            {descriptionOfBlog}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails
