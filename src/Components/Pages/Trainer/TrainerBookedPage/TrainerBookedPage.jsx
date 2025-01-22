import React from 'react'
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const TrainerBookedPage = () => {
    const { id, exp } = useParams();
    console.log(id, exp);
    const axiosSecure = useAxiosSecure()
    const handleBooking = async () => {
        const trainerInfo = {
            trainerId: id,
            trainerDay: exp
        }
        try {
            const { data } = await axiosSecure.post('/book-trainer', trainerInfo)
            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div>
            Trainer Booked Page data will be here
            <h1 className="text-xl font-bold">Booking Trainer</h1>
            <p>Trainer ID: {id}</p>
            <p>Selected Day: {exp}</p>

            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                onClick={handleBooking}
            >
                Confirm Booking
            </button>
        </div>
    )
}

export default TrainerBookedPage
