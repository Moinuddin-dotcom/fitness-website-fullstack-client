import React from 'react'
import Loading from '../Loading'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useClasses from '../../../Hooks/useClasses';
import { Avatar, CardFooter, Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
// Typography
// import { IconButton, Typography } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const AllClasses = () => {
    const [adminClasses, isLoading] = useClasses()
    // const [active, setActive] = React.useState(1);



    if (isLoading) return <Loading />





    return (
        <div>
            {
                (adminClasses.length <= 0) ?
                    <>
                        <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>

                    </>
                    :
                    <>
                        <div className='max-w-[80vw] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {adminClasses.map(classCard =>
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
                                            {classCard.slot.map(img =>
                                                <Link to={`/trainerDetails/${img?.bookedById}`}>
                                                    <Tooltip content={img?.bookedByName}>
                                                        <Avatar
                                                            size="sm"
                                                            variant="circular"
                                                            alt={img?.bookedByName}
                                                            src={img?.bookedByImage}
                                                            className="border-2 border-white hover:z-10 w-10 h-10 rounded-full"
                                                        />
                                                    </Tooltip>
                                                </Link>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>
                        {/* <div className="flex bg-white items-center gap-8 justify-center my-5">
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={prev}
                                disabled={active === 1}
                            >
                                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                            <Typography color="gray" className="font-normal">
                                Page <strong className="text-gray-900">{active}</strong> of{" "}
                                <strong className="text-gray-900">{totalPages}</strong>
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={next}
                                disabled={active === totalPages}
                            >
                                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                        </div> */}
                    </>
            }

        </div>
    )
}

export default AllClasses
