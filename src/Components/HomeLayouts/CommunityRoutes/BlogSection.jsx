import React from 'react'
import { Link } from 'react-router-dom'

const BlogSection = ({ blogData }) => {
    const { title,
        addedbyRole,
        createdAt,
        descriptionOfBlog,} = blogData || {}
    return (
        <div>

            <article className="max-w-2xl px-6  my-10 py-24 mx-auto space-y-16 bg-gray-800 text-gray-50">
                <div className="w-full mx-auto space-y-4">
                    <h1 className="text-5xl font-bold leading-none">{title}</h1>
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
