import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuth from '../../../../Hooks/useAuth'
import Loading from '../../Loading'
import { Helmet } from 'react-helmet'
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Email", "Status", "Action"];


// import { useForm } from 'react-hook-form'

const AppliedTrainer = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: appliedTrainers = [], isLoading, refetch } = useQuery({
        queryKey: ['appliedTrainers', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`)
          
            return data

        }
    })
    if (isLoading) return <Loading />
    return (
        <div className='max-w-[80vw] mx-auto my-10'>
            <Helmet>
                <title>Dashboard | Applied Trainers | Aura Fusion Gym</title>
            </Helmet>

            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        {(appliedTrainers) ? <>
                            <tr>
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
                            </tr>
                        </> : ""}
                    </thead>
                    <tbody>
                        {appliedTrainers.map(({ name, email, status, _id }, index) => {
                            const isLast = index === appliedTrainers.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                status === "Pending" && <tr key={name}>
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
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {status ? <p className={`${status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>{status}</p> : <p className='text-red-500'>Unavailable</p>}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            // as="a"
                                            // href="#"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            <Link to={`/dashboard/applied-trainer-details/${_id}`}>
                                                <button className="btn btn-ghost btn-xs">details</button>
                                            </Link>
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>


        </div>
    )
}

export default AppliedTrainer
