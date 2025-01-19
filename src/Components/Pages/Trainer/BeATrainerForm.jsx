import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const availableDaysOptions = [
    { value: 'Sun', label: 'Sun' },
    { value: 'Mon', label: 'Mon' },
    { value: 'Tue', label: 'Tue' },
    { value: 'Wed', label: 'Wed' },
    { value: 'Thu', label: 'Thu' },
    { value: 'Fri', label: 'Fri' },
    { value: 'Sat', label: 'Sat' },
];
const experience = [
    { value: 'Less then 1 year', label: 'Less then 1 year' },
    { value: '2-3 Years', label: '2-3 Years' },
    { value: '3-4 Years', label: '3-4 Years' },
    { value: '5 Years or above', label: '5 Years or above' },
];

const trainingPrograms = [
    { value: 'How do you assess a client’s fitness level and design a personalized program?', label: 'How do you assess a client’s fitness level and design a personalized program?' },
    { value: 'What kind of equipment do you use in your training sessions?', label: 'What kind of equipment do you use in your training sessions?' },
    { value: 'How do you track progress and adjust workout plans?', label: 'How do you track progress and adjust workout plans?' },

];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const BeATrainerForm = () => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    // const [status, setStatus] = useState('pending');
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [textareaVisible, setTextareaVisible] = useState(false)
    const [selectedPrograms, setSelectedPrograms] = useState([]);

    const handleSelectChange = (selected) => {
        setSelectedPrograms(selected || []);
        setTextareaVisible(selected && selected.length > 0);
    };

    const onSubmit = async (data) => {
        console.log('Submitted Data:', data);


        const imageFile = { image: data.image[0] }
        const response = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        })


        if (response.data.success) {
            const trainerInfo = {
                name: user?.displayName,
                email: user?.email,
                image: response.data.data.display_url,
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
                // role: "Member",
                status: "Pending"
            }
            // console.log(trainerInfo.name)
            await axiosSecure.post('/trainers', trainerInfo)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        toast.success(`${user?.displayName} your trainer request sent`)
                        reset()
                    }
                    if (res.data.insertedId === null) {
                        toast.error("You already applied for trainer")
                        reset()
                    }
                })
        }
        console.log("With Image URL--->", response.data)
    };
    return (
        <div className="max-w-lg mx-auto p-6  border rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Submit Your Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Your name is</label>
                    {/* Name */}
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        {...register(`${user?.displayName}`)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-white rounded-md"
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-white rounded-md"
                        readOnly
                    />
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
                        {...register('image', { required: 'Profile Image is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
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

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Qualifications and Certifications</label>
                    {/* Qualifications */}
                    <input
                        type="text"
                        {...register('qualifications', { required: 'Qualifications is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.qualifications && <p className="text-red-500 text-sm">{errors.qualifications.message}</p>}
                </div>


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
                    <label className="block text-sm font-medium text-gray-700">Costs and Policies</label>
                    {/* Costs and Policies */}
                    <input
                        type="number"
                        {...register('cost', { required: 'Costs and Policies is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.cost && <p className="text-red-500 text-sm">{errors.cost.message}</p>}
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder='Your answer'
                    />}
                    {/* {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>} */}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Other Info</label>
                    {/* otherInfo */}
                    <textarea
                        {...register('otherInfo')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>


                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Apply
                    </button>
                </div>
            </form>

        </div>
    )
}

export default BeATrainerForm
