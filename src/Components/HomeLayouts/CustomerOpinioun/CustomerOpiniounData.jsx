import React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    // Typography,
    Avatar,
    // Rating,
} from "@material-tailwind/react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const CustomerOpiniounData = ({ reviews }) => {
    console.log(reviews)
    const { feedback, feedbackUserName, feedbackUserPhoto, rating } = reviews || {}
    return (
        <div className='py-44 bg-white'>
            <Card color="transparent" shadow={false} className=" max-w-[40vw] mx-auto bg-purple-200 p-5">
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-8"
                >
                    <Avatar
                        size=""
                        variant="circular"
                        src={feedbackUserPhoto}
                        alt="tania andrew"
                    />
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                                {feedbackUserName}
                            </Typography>
                        </div>
                        <Typography color="blue-gray">
                            <Box sx={{ '& > legend': { mt: 1, py: 1 } }}  >
                                <Rating
                                    name="simple-controlled"
                                    defaultValue={rating}
                                />
                            </Box>
                        </Typography>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="mb-6 p-0">
                    <Typography>
                        &quot;{feedback} !!!&quot;
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default CustomerOpiniounData
