import React from 'react'
import { Link } from 'react-router-dom'

const BlogSection = ({ blogData }) => {
    const { title,
        blogImage,
        tipsImage,
        nutritionImage,
        addedbyId,
        addedbyName,
        addedbyEmail,
        addedbyPhoto,
        addedbyRole,
        createdAt,
        tipsDescription,
        nutritionDescription,
        descriptionOfBlog,
        upVote,
        downVote, } = blogData || {}
    console.log(blogData)
    return (
        <div>
            {/* <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-800 text-gray-100">
                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                    <img src={blogImage} alt="" className="w-full h-60 sm:h-96" />
                    <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
                        <div className="space-y-2">
                            <div className="inline-block text-2xl font-semibold sm:text-3xl">{title}</div>
                            <div className='flex justify-between'>
                                <p className="text-xs text-gray-400 ">Posted By
                                    <span rel="noopener noreferrer" className="text-xs hover:underline font-bold dark:text-cyan-400">{addedbyName}</span>
                                </p>
                                <p className="text-xs text-gray-400 ">Posted At:
                                    <span rel="noopener noreferrer" className="text-xs hover:underline">{createdAt}</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-gray-100">
                            <div>{descriptionOfBlog.slice(0, 200)}
                                <Link to={`/blogDetails/${blogData._id}`} className='text-blue-400 underline underline-offset-2 font-semibold text-sm'>See more details...</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <article className="max-w-2xl px-6  my-10 py-24 mx-auto space-y-16 bg-gray-800 text-gray-50">
                <div className="w-full mx-auto space-y-4">
                    <h1 className="text-5xl font-bold leading-none">{title}</h1>
                    {/* <div className="flex flex-wrap space-x-2 text-sm text-gray-400">
                        <a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#MambaUI</a>
                        <a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#TailwindCSS</a>
                        <a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#Angular</a>
                    </div> */}
                    <p className="text-sm text-gray-400">by
                        <span target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-400">
                            <span>{addedbyRole}</span>
                        </span>on
                        <time datetime="2021-02-12 15:34:18-0200">{createdAt}</time>
                    </p>
                </div>
                <div className="text-gray-100">
                    <div>{descriptionOfBlog.slice(0, 200)}
                        <Link to={`/blogDetails/${blogData._id}`} className='text-blue-400 underline underline-offset-2 font-semibold text-sm'>See more details...</Link>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default BlogSection
