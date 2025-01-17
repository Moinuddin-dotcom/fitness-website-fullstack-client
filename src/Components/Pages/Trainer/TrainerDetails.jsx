import React from 'react'
import { Link, useParams } from 'react-router-dom'
import BeATrainer from './BeATrainer';

const trainers =
    [
        {
            "id": 1,
            "name": "John Doe",
            "profileImage": "https://i.ibb.co.com/Rv8X7dp/about-1.jpg",
            "experience": "10 years",
            "expertise": "Fitness and Strength Training",
            "qualification": "Certified Personal Trainer (CPT) from NASM",
            "details": "John Doe is a certified fitness trainer with over 10 years of experience helping clients achieve their health goals. He specializes in strength training, nutrition, and weight loss programs.",
            "socialIcons": {
                "facebook": "https://facebook.com/johndoe",
                "twitter": "https://twitter.com/johndoe",
                "linkedin": "https://linkedin.com/in/johndoe"
            },
            "availableSlots": [
                "Monday 9:00 AM - 10:00 AM",
                "Wednesday 2:00 PM - 3:00 PM",
                "Friday 6:00 PM - 7:00 PM"
            ]
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "profileImage": "https://i.ibb.co.com/cL9W1DS/about-2.jpg",
            "experience": "8 years",
            "expertise": "Yoga and Meditation",
            "qualification": "RYT-200 Certified Yoga Instructor",
            "details": "Jane Smith has been teaching yoga and meditation for 8 years. She is passionate about helping people achieve mental clarity and physical wellness through mindful practices.",
            "socialIcons": {
                "facebook": "https://facebook.com/janesmith",
                "twitter": "https://twitter.com/janesmith",
                "linkedin": "https://linkedin.com/in/janesmith"
            },
            "availableSlots": [
                "Tuesday 8:00 AM - 9:00 AM",
                "Thursday 4:00 PM - 5:00 PM",
                "Saturday 10:00 AM - 11:00 AM"
            ]
        },
        {
            "id": 3,
            "name": "Chris Johnson",
            "profileImage": "https://i.ibb.co.com/Jnvkmq2/about-3.jpg",
            "experience": "6 years",
            "expertise": "Dance and Choreography",
            "qualification": "Bachelor of Fine Arts in Dance",
            "details": "Chris Johnson is a professional dancer and choreographer with 6 years of experience. He has worked with numerous dance companies and specializes in modern and hip-hop dance styles.",
            "socialIcons": {
                "facebook": "https://facebook.com/chrisjohnson",
                "twitter": "https://twitter.com/chrisjohnson",
                "linkedin": "https://linkedin.com/in/chrisjohnson"
            },
            "availableSlots": [
                "Monday 3:00 PM - 4:00 PM",
                "Wednesday 5:00 PM - 6:00 PM",
                "Friday 7:00 PM - 8:00 PM"
            ]
        }
    ]

const TrainerDetails = () => {
    const { id } = useParams();
    const trainer = trainers.find((trainer) => trainer.id === parseInt(id));

    if (!trainer) {
        return <p>Trainer not found.</p>;
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 border border-white shadow-md rounded-lg">
                <div className="text-center">

                    <img
                        className="  mx-auto mb-4"
                        src={trainer.profileImage}
                        alt={trainer.name}
                    />
                    <h1 className="text-2xl font-bold">{trainer.name}</h1>
                    <p className="text-gray-600">{trainer.experience}</p>
                    <p className="text-blue-500 italic">{trainer.expertise}</p>
                    <p className="text-green-500 font-semibold">{trainer.qualification}</p>
                </div>
                <div className="my-6">
                    <h2 className="text-xl font-bold mb-2">Details</h2>
                    <p className="text-gray-700">{trainer.details}</p>
                </div>
                <div className="my-6">
                    <h2 className="text-xl font-bold mb-2">Available Slots</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* <Link> */}
                        {trainer.availableSlots.map((slot, index) => (
                            <Link to={'/trainerBooking'}
                                key={index}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {slot}
                            </Link>
                        ))}
                        {/* </Link> */}
                    </div>
                </div>
                <div className="my-6">
                    <h2 className="text-xl font-bold mb-2">Connect</h2>
                    <div className="flex gap-4 justify-center">
                        <a href={trainer.socialIcons.facebook} target="_blank" rel="noreferrer">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                                alt="Facebook"
                                className="w-8 h-8"
                            />
                        </a>
                        <a href={trainer.socialIcons.twitter} target="_blank" rel="noreferrer">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                                alt="Twitter"
                                className="w-8 h-8"
                            />
                        </a>
                        <a href={trainer.socialIcons.linkedin} target="_blank" rel="noreferrer">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                                alt="LinkedIn"
                                className="w-8 h-8"
                            />
                        </a>
                    </div>
                </div>
                <BeATrainer />
            </div>
        </>
    );
}

export default TrainerDetails
