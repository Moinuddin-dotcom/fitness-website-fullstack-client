import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import ActivityLogModal from './ActivityLogModal'
import { Helmet } from 'react-helmet'

import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Role", "Status", "Updates"];

const ActivityLog = () => {
    const axiosSecure = useAxiosSecure()
    const { data: trainers = [], refetch } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosSecure('/users')
            return res.data

        }
    })
    return (
        <div className='md:max-w-[80vw] mx-auto my-10'>
            <Helmet>
                <title>Dashboard | Activity Log | Aura Fusion Gym</title>
            </Helmet>

            <Card className="h-full w-full overflow-scroll rounded-none">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {trainers ? <>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </> : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {trainers ? <>
                            {trainers.map(({ name, role, status, rejectInfo }, index) => {
                                const isLast = index === trainers.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    role !== "admin" && <tr key={name}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {role}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {status === "Pending" && <p className='text-yellow-500'>{status}</p>}
                                                {status === "Reject" && <p className='text-red-500'>{status}</p>}
                                                {status === "Approved" && <p className='text-green-500'>{status}</p>}
                                          
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {rejectInfo?.rejectReason ? <> <ActivityLogModal post={rejectInfo} /></> : ""}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </> : <><h1 className='text-center text-4xl mt-20'>No Data added Here</h1></>}

                    </tbody>
                </table>
            </Card>

        </div>
    )
}

export default ActivityLog

