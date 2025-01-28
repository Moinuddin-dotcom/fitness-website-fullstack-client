import React from 'react'
import useBlog from '../../Hooks/useBlog'
import Loading from '../Pages/Loading'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SectionTitles from '../SharedMarque/SectionTitles';

const HomeCommunity = () => {
    const [blogData, blogLoading] = useBlog()
    if (blogLoading) return <Loading />
    return (
        <>
             <SectionTitles subHeading={'Latest Community posts'} heading={'Community'} />
        <div className='max-w-[85vw] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {blogData.slice(0, 6).map(blog =>
                <Card sx={{ maxWidth: 345 }} key={blog._id}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={blog.blogImage}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {blog.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Posted by: <strong>{blog.addedbyRole}</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {blog.descriptionOfBlog.slice(0, 60)}

                        </Typography>
                    </CardContent>
                </Card>
            )}
        </div>
        </>
    )
}

export default HomeCommunity
