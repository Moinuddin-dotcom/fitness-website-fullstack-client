import React from 'react'
import { useForm } from 'react-hook-form';

const AddNewClass = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log('Submitted Data:', data);
    }
    return (
        <div className='max-w-[80vw] mx-auto my-10 bg-white p-5 rounded-lg shadow-lg'>
            AddNewClass Here
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700">Class name: </label>
                        {/* Name */}
                        <input
                            type="text"
                            // defaultValue={user?.displayName}
                            {...register("className", { required: 'Class name is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20  rounded-md"
                            readOnly
                        />
                        {/* {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>} */}
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700">Profile Image: </label>
                        {/* Profile image */}
                        <input
                            type="file"
                            // defaultValue={user?.photoURL}
                            {...register("photo", { required: 'Profile Image is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {/* {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>} */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNewClass
