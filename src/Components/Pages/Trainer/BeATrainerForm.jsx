import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { Button } from '@headlessui/react';

const availableDaysOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednessday', label: 'Wednessday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
];
const experience = [
    { value: '0-1', label: '0-1' },
    { value: '1-2', label: '1-2' },
    { value: '2-3', label: '2-3' },
    { value: '4-5', label: '4-5' },
];

const trainingPrograms = [
    { value: 'How do you assess a client’s fitness level and design a personalized program?', label: 'How do you assess a client’s fitness level and design a personalized program?' },
    { value: 'What kind of equipment do you use in your training sessions?', label: 'What kind of equipment do you use in your training sessions?' },
    { value: 'How do you track progress and adjust workout plans?', label: 'How do you track progress and adjust workout plans?' },

];

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const BeATrainerForm = () => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    // const [status, setStatus] = useState('pending');
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [textareaVisible, setTextareaVisible] = useState(false)
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const navigate = useNavigate()

    const handleSelectChange = (selected) => {
        setSelectedPrograms(selected || []);
        setTextareaVisible(selected && selected.length > 0);
    };

    const onSubmit = async (data) => {
        console.log('Submitted Data:', data);


        // const imageFile = { image: data.image[0] }
        // const response = await axiosPublic.post(image_hosting_api, imageFile, {
        //     headers: { 'content-type': 'multipart/form-data' }
        // })


        // if (response.data.success) {
        const trainerInfo = {
            name: user?.displayName,
            email: user?.email,
            // image: response.data.data.display_url,
            image: user?.photoURL,
            age: parseInt(data.age),
            skills: data.skills,
            availableTime: parseInt(data.availableTime),
            availableDays: data.availableDays,
            qualifications: data.qualifications,
            experience: data.experience,
            cost: data.cost,
            trainingPrograms: selectedPrograms,
            trainingInfo: textareaVisible ? data.trainingInfo : null,
            otherInfo: data.otherInfo,
            rejectInfo: " ",
            status: "Pending"
        }
        const res = await axiosSecure.patch(`/users-from/${user?.email}`, trainerInfo)
        console.log(res.data)
        // if (res.status === 200) {
        if (res.data.modifiedCount > 0) {
            toast.success('Trainer request sent successfully!');
            navigate('/dashboard/member-activity')
            reset();
        } else {
            toast.error('Failed to send trainer request.');
        }
        // console.log(trainerInfo.name)
        // const { res } = `/userdata/${user?._id}`
        // await axiosSecure.post('/trainers', trainerInfo)
        // if (res.modifiedCount > 0) {
        //     // show success message
        //     // toast.success(`${data.name} is updated on menu `)
        //     console.log("Done")
        //     // reset()
        // }
        // .then(res => {
        //     console.log(res.data)
        //     if (res.data.insertedId) {
        //         toast.success(`${user?.displayName} your trainer request sent`)
        //         reset()
        //     }
        //     if (res.data.insertedId === null) {
        //         toast.error("You already applied for trainer")
        //         reset()
        //     }
        // })
        // }
        // console.log("With Image URL--->", response.data)
    };
    return (
        <div className="max-w-5xl mx-auto  rounded-md shadow-md border-4 bg-white/65 text-black border-fuchsia-800  m-10 p-10">
            <h2 className="text-2xl font-semibold mb-4 text-center underline underline-offset-4">Submit Your Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Your name is</label>
                        {/* Name */}
                        <input
                            type="text"
                            defaultValue={user?.displayName}
                            {...register(`${user?.displayName}`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                            readOnly
                        />
                        {/* {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>} */}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        {/* Email */}
                        <input
                            type="email"
                            defaultValue={user?.email}
                            {...register(`${user?.email}`, { required: 'Email is required' })}
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
                            {...register('age', { required: 'Age is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        {/* Profile image */}
                        <input
                            type="image"
                            defaultValue={user?.photoURL}
                            {...register(`${user?.photoURL}`, { required: 'Profile Image is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {/* {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>} */}
                    </div>
                </div>

                {/* Skills */}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Skills</label>
                    <div className="flex flex-wrap gap-8">
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills', { required: 'At least one skill is required' })}
                                value="ROM"
                            />
                            <span className='ml-2'>ROM</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="AMRAP"
                            />

                            <span className='ml-2'>AMRAP</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="DOMS"
                            />

                            <span className='ml-2'>DOMS</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Deadlifting"
                            />

                            <span className='ml-2'>Deadlifting</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="BenchPress "
                            />

                            <span className='ml-2'>Bench Press </span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Squatting  "
                            />

                            <span className='ml-2'>Squatting</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="TreadmillRunning  "
                            />

                            <span className='ml-2'>Treadmill Running</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="RowingMachine  "
                            />

                            <span className='ml-2'>Rowing Machine</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="JumpRopeTechniques  "
                            />

                            <span className='ml-2'>Jump Rope Techniques</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="YogaPoses  "
                            />

                            <span className='ml-2'>Yoga Poses</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Yoga"
                            />

                            <span className='ml-2'>Yoga</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="KettlebellSwings"
                            />

                            <span className='ml-2'>Kettlebell Swings</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="MedicineBallSlams"
                            />

                            <span className='ml-2'>Medicine Ball Slams</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Pull-Ups"
                            />

                            <span className='ml-2'>Pull-Ups</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                {...register('skills')}
                                value="Chin-Ups"
                            />

                            <span className='ml-2'>Chin-Ups</span>
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
                {/* </div> */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Available Time(In a day)</label>
                        {/* Available Time */}
                        <input
                            type="number"
                            {...register('availableTime', { required: 'Available Time is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                        />
                        {errors.availableTime && <p className="text-red-500 text-sm">{errors.availableTime.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Qualifications and Certifications</label>
                        {/* Qualifications */}
                        <input
                            type="text"
                            {...register('qualifications', { required: 'Qualifications is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
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
                            options={experience}
                            onChange={(selectedExperience) => setValue('experience', selectedExperience)}
                            className="mt-1 "
                        />
                        {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Your expection (BDT)</label>
                        {/* Costs and Policies */}
                        <input
                            type="number"
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
                        options={trainingPrograms}
                        onChange={(selected) => {
                            setValue('trainingPrograms', selected)
                            handleSelectChange(selected)
                        }}
                        className="mt-1 "
                    />
                    {textareaVisible && <textarea
                        {...register('trainingInfo')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                        placeholder='Your answer'
                    />}
                    {/* {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>} */}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Other Info</label>
                    {/* otherInfo */}
                    <textarea
                        {...register('otherInfo')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                    />
                </div>


                <div className="mb-4 text-center">
                    <Button type="submit" className="inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white w-1/3 ">
                        Save changes
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default BeATrainerForm
