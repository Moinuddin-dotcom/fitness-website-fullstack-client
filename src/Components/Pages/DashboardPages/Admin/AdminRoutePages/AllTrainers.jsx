import React, { useState } from 'react'
import useAuth from '../../../../../Hooks/useAuth'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../Loading'
import { Card, Typography } from "@material-tailwind/react";
import { TrashIcon } from '@heroicons/react/20/solid'
import { GoTrash } from 'react-icons/go'
import { Button } from '@headlessui/react'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

const TABLE_HEAD = ["Name", "Role", "Email", "Action"];

const AllTrainers = () => {
    const [deletetrainer, setDeletetrainer] = useState('member')
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: allTrainers = [], isLoading, refetch } = useQuery({
        queryKey: ['allTrainers', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`)
            return data

        }
    })
    if (isLoading) return <Loading />
    const trainers = allTrainers.filter((person) => person.role === 'trainer');

    const handleDeleteTrainer = async (email, deleteTrainer) => {

        try {
            const { data } = await axiosSecure.patch(`/trainer-role-update/${email}`, { role: deleteTrainer })
         
            if (data.modifiedCount > 0) {
                toast.success('Trainer removed successfully');
                refetch()
            } else {
                toast.error('Failed to remove trainer.');
            }
        } catch (error) {
            toast.error('Failed to remove trainer')

        }
    }



    return (
        <div>
            <Helmet>
                <title>Dashboard | All Trainers | Aura Fusion Gym</title>
            </Helmet>
            <Card className="max-w-[80vw] mx-auto my-10 overflow-scroll px-6 h-screen">
                <h1 className='font-bold text-xl underline underline-offset-4 text-center py-5'>All Trainers</h1>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {
                                trainers.length <= 0 ? "" :
                                    <>

                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold leading-none"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            (trainers.length <= 0) ?
                                <>
                                    <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Trainers Added by Admin</h1>
                                </>
                                :
                                <>
                                    {trainers.map(({ name, role, email }, index) => {
                                        const isLast = index === trainers.length - 1;
                                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                                        return (
                                            <tr key={name} className="hover:bg-gray-50">
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        {role}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        {email}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        <Button onClick={() => handleDeleteTrainer(email, deletetrainer)}><GoTrash className='text-2xl text-red-600' /></Button>
                                                    </Typography>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                        }


                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default AllTrainers
