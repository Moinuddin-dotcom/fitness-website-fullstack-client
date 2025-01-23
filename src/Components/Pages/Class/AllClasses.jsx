import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading'

// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useUser from '../../../Hooks/useUser';

const AllClasses = () => {
    const [, users] = useUser()
    console.log(users)

    const axiosSecure = useAxiosSecure()
    const { data: allClass = [], isLoading } = useQuery({
        queryKey: ['allClass'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/classes')
            return data
        }
    })
    if (isLoading) return <Loading />
    console.log(allClass)

    // const userName = users.map(user => user.name)
    // console.log(userName)

    return (
        <div>
            {
                (allClass.length <= 0) ?
                    <>
                        <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>

                    </>
                    :
                    <>
                        <div className='max-w-[80vw] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {allClass.map(classCard =>
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
                                    <CardActions className='border-t-2 border-gray-200'>
                                        {/* {(classCard.className === (users?.slotName)) && "Hii"} */}
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            )}
                        </div>
                        <div>
                            {/* {users.slotName} */}
                        </div>
                    </>
            }

        </div>
    )
}

export default AllClasses
