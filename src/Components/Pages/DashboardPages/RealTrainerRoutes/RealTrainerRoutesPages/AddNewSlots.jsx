
import { useForm } from 'react-hook-form';
import useAuth from '../../../../../Hooks/useAuth';
import Select from 'react-select';
import { Button } from '@headlessui/react';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Loading';
import useLoggedUser from '../../../../../Hooks/useLoggedUser';
import toast from 'react-hot-toast';
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
    { value: 'Powerhouse Pump', label: 'Powerhouse Pump' },
    { value: 'Iron Warriors', label: 'Iron Warriors' },
    { value: 'Barbell Brigade', label: 'Barbell Brigade' },
    { value: 'Strength Surge', label: 'Strength Surge' },
    { value: 'Lifting Legends', label: 'Lifting Legends' },
    { value: 'Cardio Crushers', label: 'Cardio Crushers' },
];

const AddNewSlots = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [loggedUser, isLoading] = useLoggedUser()
    const navigate = useNavigate()

    const { name, email, image, age, skills, availableTime, availableTimeZone,
        availableDays, qualifications, experience, cost,
        trainingInfo, trainingPrograms, otherInfo, _id } = loggedUser || {}


    const onSubmit = async (data) => {
        const userInfo = {
            bookedById: loggedUser._id,
            bookedBy: loggedUser.email,
            bookedByName: loggedUser.name,
            bookedByImage: loggedUser.image,
            slotName: data.slotName,
            slotTime: parseInt(data.slotTime),
            selectClass: data.selectClass[0].value,
        }
        try {
            const response = await axiosSecure.patch(`/add-slots`, userInfo, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` },
            })
            if (response?.data?.modifiedCount > 0) {
                navigate("/dashboard/manage-slots")
                toast.success("New Slot added successfully")
                reset()
            }
        }
        catch (err) {
            toast.err(err.message)
        }

    }

    if (isLoading) return <Loading />



    return (
        <div>
            <Helmet>
                <title>Dashboard | Add New Slots | Aura Fusion Gym</title>
            </Helmet>
            <div className="max-w-5xl mx-auto  mt-10 border-4 bg-white/5 p-5 rounded-lg shadow-xl shadow-yellow-900 border-t-2 border-yellow-900">
                <h2 className="text-2xl font-semibold mb-4 text-center underline underline-offset-4">Submit Your Information</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">Your name is</label>
                            <input
                                type="text"
                                defaultValue={name}
                                {...register(`${name}`)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">Email</label>
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
                            <label className="block text-sm font-medium text-white">Age</label>
                            {/* Age */}
                            <input
                                type="number"
                                defaultValue={age}
                                {...register(`${age}`, { required: 'Age is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                            />
                            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                        </div>

                        {/* Profile image */}
                        {/* <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input
                                type="image"
                                defaultValue={image}
                                {...register(`${user?.photoURL}`, { required: 'Profile Image is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div> */}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Skills</label>
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
                            <label className="block text-sm font-medium text-white">Available Days</label>
                            {/* Available Days */}
                            <Select
                                isMulti
                                name="availableDays"
                                defaultValue={availableDays}
                                className="mt-1 "
                                isDisabled={true} // 'readOnly' is not a valid prop in react-select, use 'isDisabled' instead
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "lightblue", // Change to your preferred color
                                    color: "black", // Adjust text color
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "lightblue", // Background for selected options
                                }),
                                multiValueLabel: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "black", // Text color for selected options
                                }),
                                multiValueRemove: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "red",
                                    ":hover": {
                                        backgroundColor: "darkred",
                                        color: "white",
                                    },
                                }),
                            }}
                            />
                            {errors.availableDays && <p className="text-red-500 text-sm">{errors.availableDays.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">Available TimeZone: </label>
                            {/* Available availableTimeZone */}
                            <Select
                                isMulti
                                name="availableTimeZone"
                                defaultValue={availableTimeZone}
                                className="mt-1 "
                                isDisabled={true} // 'readOnly' is not a valid prop in react-select, use 'isDisabled' instead
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "lightblue", // Change to your preferred color
                                    color: "black", // Adjust text color
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "lightblue", // Background for selected options
                                }),
                                multiValueLabel: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "black", // Text color for selected options
                                }),
                                multiValueRemove: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "red",
                                    ":hover": {
                                        backgroundColor: "darkred",
                                        color: "white",
                                    },
                                }),
                            }}
                            />
                            {errors.availableTimeZone && <p className="text-red-500 text-sm">{errors.availableTimeZone.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">Available Time(In a day)</label>
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
                            <label className="block text-sm font-medium text-white">Qualifications and Certifications</label>
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
                            <label className="block text-sm font-medium text-white">Experience</label>
                            {/* Experience */}
                            <Select
                                isMulti
                                name="experience"
                                defaultValue={experience}
                                className="mt-1 "
                                isDisabled={true} // 'readOnly' is not a valid prop in react-select, use 'isDisabled' instead
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: "lightblue", // Change to your preferred color
                                        color: "black", // Adjust text color
                                    }),
                                    multiValue: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: "lightblue", // Background for selected options
                                    }),
                                    multiValueLabel: (baseStyles) => ({
                                        ...baseStyles,
                                        color: "black", // Text color for selected options
                                    }),
                                    multiValueRemove: (baseStyles) => ({
                                        ...baseStyles,
                                        color: "red",
                                        ":hover": {
                                            backgroundColor: "darkred",
                                            color: "white",
                                        },
                                    }),
                                }}
                            />
                            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">Your expection (BDT)</label>
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
                        <label className="block text-sm font-medium text-white">Training Programs</label>
                        {/* Training Programs */}
                        <Select
                            isMulti
                            name="trainingPrograms"
                            defaultValue={trainingPrograms}
                            className="mt-1 "
                            isDisabled={true} // 'readOnly' is not a valid prop in react-select, use 'isDisabled' instead
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "lightblue", // Change to your preferred color
                                    color: "black", // Adjust text color
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "lightblue", // Background for selected options
                                }),
                                multiValueLabel: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "black", // Text color for selected options
                                }),
                                multiValueRemove: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "red",
                                    ":hover": {
                                        backgroundColor: "darkred",
                                        color: "white",
                                    },
                                }),
                            }}
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
                        <label className="block text-sm font-medium text-white">Other Info</label>
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
                                <label className="block text-sm font-medium text-white">Slot name:</label>
                                {/* slotName */}
                                <input
                                    type="text"

                                    {...register("slotName", { required: 'Slot Name is required' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                                />
                                {errors.slotName && <p className="text-red-500 text-sm">{errors.slotName.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-white">Slot Time(Hours)</label>
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
                            <label className="block text-sm font-medium text-white">Select Class(Choose only one)</label>
                            {/* Training Programs */}
                            {/* <Select
                                isMulti
                                name="selectClass"

                                options={selectClass}
                                onChange={(selected) => {
                                    setValue('selectClass', selected)
                                }}
                                className="mt-1 "
                                
                            /> */}
                            <Select
                                isMulti
                                name="selectClass"
                                options={selectClass}
                                onChange={(selected) => {
                                    setValue('selectClass', selected);
                                }}
                                className="mt-1"
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: "lightblue", // Change to your preferred color
                                        color: "black", // Adjust text color
                                    }),
                                    menu: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: "#1e293b", // Change dropdown background
                                    }),
                                    option: (baseStyles, { isFocused, isSelected }) => ({
                                        ...baseStyles,
                                        backgroundColor: isSelected
                                            ? "#0ea5e9" // Selected option background color
                                            : isFocused
                                                ? "#334155" // Hover effect color
                                                : "#1e293b", // Default background color
                                        color: "white", // Text color
                                        cursor: "pointer",
                                    }),
                                    multiValue: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: "lightblue", // Background for selected options
                                    }),
                                    multiValueLabel: (baseStyles) => ({
                                        ...baseStyles,
                                        color: "black", // Text color for selected options
                                    }),
                                    multiValueRemove: (baseStyles) => ({
                                        ...baseStyles,
                                        color: "red",
                                        ":hover": {
                                            backgroundColor: "darkred",
                                            color: "white",
                                        },
                                    }),
                                }}
                            />
                            {/* isDisabled={true} // 'readOnly' is not a valid prop in react-select, use 'isDisabled' instead */}
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
