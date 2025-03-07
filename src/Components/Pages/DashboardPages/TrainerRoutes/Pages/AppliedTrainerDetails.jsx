import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure'
import Loading from '../../../Loading'
import useRole from '../../../../../Hooks/useRole'


import AppliedTrainerDetailsRejectBtnModal from './AppliedTrainerDetailsRejectBtnModal'
// import { Button } from '@material-tailwind/react'
import { Button } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const AppliedTrainerDetails = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    // modal info start
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(!open);
    let [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }
    // modal info end
    const [accepted, setAccepted] = useState('trainer')
  
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: trainerDetails = {}, isLoading } = useQuery({
        queryKey: ['trainerDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users-details/${id}`)
           
            return data
        }
    })
    const { name, email, image, age, skills, availableTime,
        availableDays, qualifications, experience, cost,
        trainingInfo, trainingPrograms, otherInfo, _id } = trainerDetails || {}

    if (isLoading) return <Loading />




    // handle user role & status update
    const handleAccpted = async (acceptedData) => {
        try {
            const { data } = await axiosSecure.patch(`/users-role-update/${email}`, { role: acceptedData })
           
            if (data.modifiedCount > 0) {
                toast.success('Trainer request approved');
                navigate('/dashboard/applied-trainer')
                reset();
            } else {
                toast.error('Failed to reject trainer request.');
            }
        }
        catch (error) {
            toast.error('Error updating user role', error)
        }
    }


    // handle reject button by updating his status
    const onSubmit = async (data) => {
  

        const rejectInfo = {
            rejectReason: data.otherInfo
        }
      
        try {
            const { data } = await axiosSecure.patch(`/users-role-updateForReject/${email}`, { rejectInfo })
          
            if (data.modifiedCount > 0) {
                toast.success('Trainer request Rejected');
                navigate('/dashboard/applied-trainer')
                reset();
            } else {
                toast.error('Failed to reject trainer request.');
            }
        }
        catch (error) {
            toast.error('Error updating user role', error)
        }







        // close();
    }

    return (
        <>
            < div className="max-w-[80vw] min-h-screen mx-auto bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-8 shadow-lg" >
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl">
                    <img
                        src={image}
                        alt="Trainer"
                        className="w-40 h-40 rounded-full object-cover border-4 border-teal-600"
                    />
                    <h2 className="text-3xl font-bold text-teal-700 mt-4">{name}</h2>
                    <p className="text-sm text-gray-500">{email}</p>
                    <p className="text-lg text-gray-700 mt-2">Age: {age}</p>

                    <div className="w-full mt-4">
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Available Time:</p>
                            <span className="text-sm text-gray-800">{availableTime} hours</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <p className="text-sm text-gray-600">Available Days:</p>
                            <span className="text-sm text-gray-800">{availableDays.map(day => day.value).join(', ')}</span>

                        </div>

                        <div className="flex justify-between mt-2">
                            <p className="text-sm text-gray-600">Skills:</p>
                            <span className="text-sm text-gray-800">{skills.map(skill => skill).join(', ')}</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <p className="text-sm text-gray-600">Experience:</p>
                            <span className="text-sm text-gray-800">{experience.map(exp => exp.value).join(', ')}</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <p className="text-sm text-gray-600">Training Programs:</p>
                            <span className="text-sm text-gray-800">{trainingPrograms.map(program => program.value).join(', ')}</span>
                        </div>

                        <div className="flex justify-between mt-4">
                            <p className="text-sm text-gray-600">Qualifications:</p>
                            <span className="text-sm text-gray-800">{qualifications}</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <p className="text-sm text-gray-600">Sallary you wish to:</p>
                            <span className="text-sm text-gray-800">${cost}</span>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-800"> <strong>Question:</strong>
                                <span className="text-sm text-gray-800">{trainingPrograms.map(program => program.value).join(', ')}</span>
                            </p>

                            <p className="text-sm text-gray-800"><strong>Answer:</strong> {trainingInfo}</p>
                            {/* {trainingInfo && (
                            )} */}
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-800"><strong>Other Info:</strong> {otherInfo}</p>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <Button
                                onClick={open}
                                className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                Reject
                            </Button>
                            <Button
                                className="rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => handleAccpted(accepted)}
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
            {/* // modal info start */}

            <AppliedTrainerDetailsRejectBtnModal close={close} isOpen={isOpen} email={email}
                register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} />

            {/* // modal info end */}


        </>
    )
}

export default AppliedTrainerDetails