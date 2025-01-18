import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure'
import Loading from '../../../Loading'

const AppliedTrainerDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    console.log(id)

    const { data: trainerDetails = {}, isLoading } = useQuery({
        queryKey: ['trainerDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/trainers/${id}`)
            // console.log(data)
            return data
        }
    })
    const { name, email, image, age, skills, availableTime,
        availableDays, qualifications, experience, cost,
        trainingInfo, trainingPrograms, otherInfo, role } = trainerDetails || {}

    if (isLoading) return <Loading />
    console.log(trainerDetails)
    return (
        // <div>

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

                    {/* <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-600">Training Programs:</p>
                        <span className="text-sm text-gray-800">{trainingPrograms.map(program => program.value).join(', ')}</span>
                    </div> */}

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

                        {trainingInfo && (
                            <p className="text-sm text-gray-800"><strong>Answer:</strong> {trainingInfo}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-gray-800"><strong>Other Info:</strong> {otherInfo}</p>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                            onClick={() => console.log('Reject clicked')}
                        >
                            Reject
                        </button>
                        <button
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                            onClick={() => console.log('Accept clicked')}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AppliedTrainerDetails
