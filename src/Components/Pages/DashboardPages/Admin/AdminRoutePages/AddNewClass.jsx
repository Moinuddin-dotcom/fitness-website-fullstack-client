
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddNewClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const response = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });

        try {
            if (response.data.success) {
                const classData = {
                    addedby: user?.displayName,
                    addedby_email: user?.email,
                    className: data.className,
                    image: response.data.data.url,
                    otherInfo: data.otherInfo
                };
                const { data: res } = await axiosSecure.post('/classes', classData);
                if (res.insertedId) {
                    toast.success("A New Class Added Successfully!");
                    reset();
                } else {
                    toast.error("Error: Could not add the class.");
                }
            }
        } catch (error) {
            toast.error("An error occurred while adding a new class.");
        }
    };

    return (
        <div className="max-w-[95vw] md:max-w-4xl mx-auto h-screen my-12 p-8 bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700">
            {/* Page Title */}
            <Helmet>
                <title>Dashboard | Add New Class | Aura Fusion Gym</title>
            </Helmet>
            <div className="text-center mb-6">
                <h2 className="text-xl md:text-3xl font-semibold text-yellow-400">Add a New Class</h2>
                <p className="text-sm text-gray-400 mt-1">Fill in the details to add a new class.</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Class Name */}
                    <div>
                        <label className="block text-md font-medium text-white">Class Name</label>
                        <input
                            type="text"
                            {...register("className", { required: 'Class name is required' })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter class name"
                        />
                        {errors.className && <p className="text-red-500 text-sm mt-1">{errors.className.message}</p>}
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-md font-medium text-white">Class Image</label>
                        <input
                            type="file"
                            {...register("image", { required: 'Class image is required' })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>
                </div>

                {/* Other Info */}
                <div>
                    <label className="block text-md font-medium text-white">Other Info</label>
                    <textarea
                        {...register('otherInfo')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-yellow-500"
                        placeholder="Additional details about the class..."
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button 
                        type="submit"
                        className="btn btn-wide bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewClass;
