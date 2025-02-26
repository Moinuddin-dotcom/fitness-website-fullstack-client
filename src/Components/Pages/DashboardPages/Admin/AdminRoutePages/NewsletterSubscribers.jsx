import React from 'react'
import Loading from '../../../Loading'
import { Card, Typography } from "@material-tailwind/react";
import { Helmet } from 'react-helmet';
import useSubscribers from '../../../../../Hooks/useSubscribers';

const TABLE_HEAD = ["", "User Name", "User Email"];
const NewsletterSubscribers = () => {
    const [subscribers, isLoading] = useSubscribers()
    if (isLoading) return <Loading />


    return (
        <div className='md:max-w-[60vw] mx-auto my-10 h-screen  '>
            <Helmet>
                <title>Dashboard | Subscribers | Aura Fusion Gym</title>
            </Helmet>

            <Card className="h-full w-full overflow-scroll rounded-none">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        {(subscribers) ? <>
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
                        {subscribers.map(({ idx, name, email }, index) => {
                            const isLast = index === subscribers.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                            </svg>

                                        </Typography>
                                    </td>
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
                                    {/* <td className={classes}>
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
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>


        </div>
    )
}

export default NewsletterSubscribers
