import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import useAuth from '../../../Hooks/useAuth';

const availableDaysOptions = [
    { value: 'Sun', label: 'Sun' },
    { value: 'Mon', label: 'Mon' },
    { value: 'Tue', label: 'Tue' },
    { value: 'Wed', label: 'Wed' },
    { value: 'Thu', label: 'Thu' },
    { value: 'Fri', label: 'Fri' },
    { value: 'Sat', label: 'Sat' },
];

const BeATrainerForm = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    // const [status, setStatus] = useState('pending');
    const { user } = useAuth()

    const onSubmit = (data) => {
        console.log('Submitted Data:', data);
        // Store the data in the database (You can replace this with your API call)
    };
    return (
        <div className="max-w-lg mx-auto p-6  border rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Submit Your Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {/* Name */}
                    <input
                        type="text"
                        {...register('fullName', { required: 'Full Name is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {/* Email */}
                    <input
                        type="email"
                        defaultValue={user?.email}
                        {...register('email', { required: 'Email is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-white rounded-md"
                        readOnly
                    />

                    {/* <input
                            {...register("email", { required: "Email is required" })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Email"
                        /> */}
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    {/* Age */}
                    <input
                        type="number"
                        {...register('age', { required: 'Age is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    {/* Profile image */}
                    <input
                        type="file"
                        {...register('profileImage', { required: 'Profile Image is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}
                </div>

                {/* Skills */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Skills</label>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills', { required: 'At least one skill is required' })}
                                value="Skill1"
                            />
                            Skill1
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Skill2"
                            />
                            Skill2
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Skill3"
                            />
                            Skill3
                        </label>
                    </div>
                    {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Available Days</label>
                    {/* Available Days */}
                    <Select
                        isMulti
                        name="availableDays"
                        options={availableDaysOptions}
                        onChange={(selectedOptions) => setValue('availableDays', selectedOptions)}
                        className="mt-1 "
                    />
                    {errors.availableDays && <p className="text-red-500 text-sm">{errors.availableDays.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Available Time</label>
                    {/* Available Time */}
                    <input
                        type="number"
                        {...register('availableTime', { required: 'Available Time is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.availableTime && <p className="text-red-500 text-sm">{errors.availableTime.message}</p>}
                </div>

                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Other Info</label>
                    <textarea
                        {...register('otherInfo')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div> */}

                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Apply
                    </button>
                </div>
            </form>

            {/* <div className="mt-4">
                <p>Status: <strong>{status}</strong></p>
            </div> */}
        </div>
    )
}

export default BeATrainerForm
