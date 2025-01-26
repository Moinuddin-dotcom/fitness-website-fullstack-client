import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import useAuth from '../../../../../Hooks/useAuth';
import Select from 'react-select';
import { Button } from '@headlessui/react';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../../../Hooks/useRole';
import Loading from '../../../Loading';
import useUser from '../../../../../Hooks/useUser';
import useLoggedUser from '../../../../../Hooks/useLoggedUser';
import toast from 'react-hot-toast';
import useClasses from '../../../../../Hooks/useClasses';
import { Helmet } from 'react-helmet';

const selectClass = [
    { value: 'Power Pump', label: 'Power Pump' },
    { value: 'Yoga', label: 'Yoga' },
    { value: 'Flex and Flow', label: 'Flex and Flow' },
    { value: 'Body Sculpt', label: 'Body Sculpt' },
    { value: 'Spin & Sweat', label: 'Spin & Sweat' },
    { value: 'Boxing Basics', label: 'Boxing Basics' },
    { value: 'Zumba Rhythms', label: 'Zumba Rhythms' },
    { value: 'Kettlebell Power', label: 'Kettlebell Power' },
];

const AddNewSlots = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [loggedUser, isLoading] = useLoggedUser()
    // console.log(loggedUser._id)
    const navigate = useNavigate()

    const { name, email, image, age, skills, availableTime, availableTimeZone,
        availableDays, qualifications, experience, cost,
        trainingInfo, trainingPrograms, otherInfo, _id } = loggedUser || {}

    // ______________________________________________________________________
    // Get all classes by using useClasses() hooks
    // const [adminClasses,] = useClasses()
    // console.log(adminClasses)


    const onSubmit = async (data) => {
        // console.log('Submitted Data:', data);
        const userInfo = {
            bookedById: loggedUser._id,
            bookedBy: loggedUser.email,
            bookedByName: loggedUser.name,
            bookedByImage: loggedUser.image,
            slotName: data.slotName,
            slotTime: parseInt(data.slotTime),
            selectClass: data.selectClass[0].value,
        }
        console.log(userInfo)
        try {
            const response = await axiosSecure.patch(`/add-slots`, userInfo, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` },
            })
            console.log(response.data)
            if (response?.data?.modifiedCount > 0) {
                navigate("/dashboard/manage-slots")
                toast.success("New Slot added successfully")
                reset()
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    if (isLoading) return <Loading />



    return (
        <div>
            <Helmet>
                <title>Dashboard | Add New Slots | Aura Fusion Gym</title>
            </Helmet>
            <div className="max-w-5xl mx-auto  rounded-md shadow-md border-4 bg-white/65 text-black border-fuchsia-800  m-10 p-10">
                <h2 className="text-2xl font-semibold mb-4 text-center underline underline-offset-4">Submit Your Information</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Your name is</label>
                            {/* Name */}
                            <input
                                type="text"
                                defaultValue={name}
                                {...register(`${name}`)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            {/* Email */}
                            <input
                                type="email"
                                defaultValue={email}
                                {...register(`${email}`, { required: 'Email is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            {/* Age */}
                            <input
                                type="number"
                                defaultValue={age}
                                {...register(`${age}`, { required: 'Age is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                            />
                            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            {/* Profile image */}
                            <input
                                type="image"
                                defaultValue={image}
                                {...register(`${user?.photoURL}`, { required: 'Profile Image is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        {/* skills */}
                        <textarea
                            defaultValue={skills}
                            {...register('skills')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                            readOnly
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Available Days</label>
                            {/* Available Days */}
                            <Select
                                isMulti
                                name="availableDays"
                                defaultValue={availableDays}
                                className="mt-1 "
                                readOnly
                            />
                            {errors.availableDays && <p className="text-red-500 text-sm">{errors.availableDays.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Available TimeZone: </label>
                            {/* Available availableTimeZone */}
                            <Select
                                isMulti
                                name="availableTimeZone"
                                defaultValue={availableTimeZone}
                                className="mt-1 "
                            />
                            {errors.availableTimeZone && <p className="text-red-500 text-sm">{errors.availableTimeZone.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Available Time(In a day)</label>
                            {/* Available Time hrs */}
                            <input
                                type="text"
                                defaultValue={availableTime}
                                {...register('availableTime', { required: 'Available Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                                readOnly
                            />
                            {errors.availableTime && <p className="text-red-500 text-sm">{errors.availableTime.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Qualifications and Certifications</label>
                            {/* Qualifications */}
                            <input
                                type="text"
                                defaultValue={qualifications}
                                {...register('qualifications', { required: 'Qualifications is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                                readOnly
                            />
                            {errors.qualifications && <p className="text-red-500 text-sm">{errors.qualifications.message}</p>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Experience</label>
                            {/* Experience */}
                            <Select
                                isMulti
                                name="experience"
                                defaultValue={experience}
                                className="mt-1 "
                                readOnly
                            />
                            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Your expection (BDT)</label>
                            {/* Costs and Policies */}
                            <input
                                type="number"
                                defaultValue={cost}
                                {...register('cost', { required: 'Costs and Policies is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                            />
                            {errors.cost && <p className="text-red-500 text-sm">{errors.cost.message}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Training Programs</label>
                        {/* Training Programs */}
                        <Select
                            isMulti
                            name="trainingPrograms"
                            defaultValue={trainingPrograms}
                            className="mt-1 "
                            readOnly
                        />
                        {/* {textareaVisible && */}
                        <textarea
                            {...register('trainingInfo')}
                            defaultValue={trainingInfo}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                            placeholder='Your answer'
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Other Info</label>
                        {/* otherInfo */}
                        <textarea
                            {...register('otherInfo')}
                            defaultValue={otherInfo}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                            readOnly
                        />
                    </div>
                    <div className='border-t-4 border-gray-300 h-60 mt-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Slot name:</label>
                                {/* slotName */}
                                <input
                                    type="text"

                                    {...register("slotName", { required: 'Slot Name is required' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                                />
                                {errors.slotName && <p className="text-red-500 text-sm">{errors.slotName.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Slot Time(Hours)</label>
                                {/* Available Time hrs */}
                                <input
                                    type="number"

                                    {...register('slotTime', { required: 'Slot Time is required' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                                />
                                {errors.slotTime && <p className="text-red-500 text-sm">{errors.slotTime.message}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Select Class(Choose only one)</label>
                            {/* Training Programs */}
                            <Select
                                isMulti
                                name="selectClass"

                                options={selectClass}
                                onChange={(selected) => {
                                    setValue('selectClass', selected)
                                }}
                                className="mt-1 "
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-4 text-center">
                        <Button type="submit" className="inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white w-1/3 ">
                            Save changes
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddNewSlots
