import React from 'react'
import { Card, Typography } from "@material-tailwind/react";
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@headlessui/react';
import { GoTrash } from 'react-icons/go';

const TABLE_HEAD = ["Trainers Name", "Slot Name", "Slot Time", "Class", "Acotions"];


const ManageSlots = () => {
    const axiosSecure = useAxiosSecure()
    const { data: trainers = [] } = useQuery({
        queryKey: ['trainer'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/all-trainers/role?role=trainer`)
            // console.log(data)
            return data
        }
    })
    console.log(trainers)
    // const slotData = slotName.filter((slot) => slot.slotName === 'trainer');
    // const slotData = trainers.filter((slot) => slot.slotName === slotName);
    // console.log(slotData)

    return (
        <div className="max-w-[80vw] mx-auto my-10">

            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {trainers.length <= 0 ? "" :
                                <>
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
                                </>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {trainers.length <= 0 ?
                            <>
                                <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>
                            </>
                            :
                            <>
                                {trainers.map(({ name, slotName, slotTime, selectClass }, index) => {
                                    const isLast = index === trainers.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
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
                                                    {slotName ? <>{slotName}</> : "No Booking"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {slotTime ? <>{slotTime} Hrs.</> : "No Booking"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {slotTime ? <>{selectClass.map(oneClass => oneClass.value)} </> : "No Booking"}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    as="a"
                                                    // href="#"
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium ml-5"
                                                >
                                                    <Button
                                                        onClick={() => console.log('Delete')}
                                                    ><GoTrash className='text-2xl text-red-600' /></Button>
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

export default ManageSlots
