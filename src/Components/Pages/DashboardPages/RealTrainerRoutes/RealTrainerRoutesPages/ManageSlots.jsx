import React from 'react'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { GoTrash } from 'react-icons/go';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Loading from '../../../Loading';
import useClasses from '../../../../../Hooks/useClasses';
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Avatar,
} from "@material-tailwind/react";
import { Button } from '@mui/material';


const TABLE_HEAD = ["All Class Information", "Trainer Information", "Action"];


const ManageSlots = () => {
    const [adminClasses, isLoading, refetch] = useClasses()
    console.log(adminClasses)
    const axiosSecure = useAxiosSecure()

    // const { _id } = adminClasses;
    // console.log(_id)

    const handleDelete = async (className, bookedByImage, bookedByName, bookedBy, slotName, slotTime, bookedById) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("Delete")
                try {
                    // const upSlot = {
                    //     className,
                    //     slot: []
                    // }
                    const { data } = await axiosSecure.patch(`/remove-slots`, { className, bookedByImage, bookedByName, bookedBy, slotName, slotTime, bookedById }, {
                        headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` },
                    })
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        // toast.success('Slot cleared successfully');
                        Swal.fire({
                            title: "Deleted!",
                            text: "Slot cleared successfully.",
                            icon: "success"
                        });
                        refetch()
                    } else {
                        toast.error('Failed to clear slot.');
                    }
                } catch (error) {
                    console.log(error.message);

                }

            }
        });
        if (isLoading) return <Loading />
    }

    return (
        <div className="max-w-[80vw] mx-auto my-10">

            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-center">
                        <div className='text-center'>
                            <Typography variant="h5" color="blue-gray">
                                Manage Slots
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about slots & who booked
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {
                                    adminClasses.length <= 0 ? "" :
                                        <>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                            {
                                adminClasses.length <= 0 ?
                                    <>
                                        <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>
                                    </>
                                    :
                                    <>
                                        {adminClasses.map(
                                            ({ image, slot, className }, index) => {
                                                const isLast = index === adminClasses.length - 1;
                                                const classes = isLast
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-50";

                                                return (
                                                    <tr key={index}>
                                                        {/* Class Info */}
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar src={image} alt={className} />
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {className}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* Trainer Info */}
                                                        <td className={classes}>
                                                            {
                                                                (slot && slot.length > 0) ? <>

                                                                    {slot.map((slotItem, idx) =>
                                                                        <div key={idx} className="flex items-center gap-3 space-y-4">
                                                                            <Avatar src={slotItem?.bookedByImage} alt={slotItem?.bookedByName}  size="" />
                                                                            <div className="flex flex-col">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    color="blue-gray"
                                                                                    className="font-normal"
                                                                                >
                                                                                    {slotItem?.bookedByName}
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="small"
                                                                                    color="blue-gray"
                                                                                    className="font-normal opacity-70"
                                                                                >
                                                                                    {slotItem?.bookedBy}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                                    : "No Booking"
                                                            }
                                                        </td>
                                                        <td className={classes}>
                                                            {
                                                                (slot && slot.length > 0) ?
                                                                    <>

                                                                        {
                                                                            slot.map((slotItem, idx) =>
                                                                                <div key={idx} className="flex items-center gap-3">
                                                                                    <Button
                                                                                        onClick={() => handleDelete(className, slotItem?.bookedByImage,
                                                                                            slotItem?.bookedByName, slotItem?.bookedBy,
                                                                                            slotItem?.slotName, slotItem?.slotTime, slotItem?.bookedById)}>
                                                                                        <GoTrash className='text-2xl text-red-600' />

                                                                                    </Button>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </>
                                                                    : "No Booking"
                                                            }

                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </>
                            }

                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div >
    )
}

export default ManageSlots
