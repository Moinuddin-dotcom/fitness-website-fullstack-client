import React, { useState } from 'react'
import Loading from '../Loading'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useClasses from '../../../Hooks/useClasses';
import { Avatar, CardFooter, Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Helmet } from 'react-helmet';

const AllClasses = () => {
    const [adminClasses, isLoading] = useClasses()
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 5;

    const startPage = (currentPage - 1) * itemPerPage
    const endPage = startPage + itemPerPage
    const paginateClass = adminClasses.slice(startPage, endPage)

    const totalPages = Math.ceil(adminClasses.length / itemPerPage)

    const handlePageChange = (e, v) => {
        setCurrentPage(v)
    }




    if (isLoading) return <Loading />





    return (
        <div>
            <Helmet>
                <title>All Classes | Aura Fusion Gym</title>
            </Helmet>
            {
                (paginateClass.length <= 0) ?
                    <>
                        <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>

                    </>
                    :
                    <>
                        <div className='max-w-[80vw] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {paginateClass.map(classCard =>
                                <Card key={classCard._id} sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={classCard.image}
                                        className='h-48'
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {classCard.className}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {classCard.otherInfo.split(' ').slice(0, 10).join(' ')}...
                                        </Typography>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between border-2 border-t">
                                        <div className="flex items-center -space-x-3">
                                            {classCard.slot.map((img, idx) =>
                                                <Link key={idx} to={`/trainerDetails/${img?.bookedById}`}>
                                                    <Tooltip content={img?.bookedByName}>
                                                        <Avatar
                                                            size="sm"
                                                            variant="circular"
                                                            alt={img?.bookedByName}
                                                            src={img?.bookedByImage}
                                                            className="border-2 border-white hover:z-10 w-10 h-10 rounded-full"
                                                        />
                                                    </Tooltip>
                                                    {/* {img.slotTime} */}
                                                </Link>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>
                        <div className='flex justify-center items-center my-5'>

                            <Stack spacing={2} className='bg-white py-2 px-10 rounded-lg'>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="secondary" />
                            </Stack>
                        </div>
                    </>
            }

        </div>
    )
}

export default AllClasses
