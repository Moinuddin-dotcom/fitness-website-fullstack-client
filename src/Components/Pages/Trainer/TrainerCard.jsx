import React from 'react';
import { Link } from 'react-router-dom';

const TrainerCard = ({ trainer }) => {
    const { name, profileImage, experience, socialIcons, availableSlots, id } = trainer;

    return (
        <div className="relative max-w-sm border rounded-lg shadow-lg overflow-hidden m-4 group">
            {/* Image */}
            <img className="w-full h-48 object-cover" src={profileImage} alt={name} />

            {/* Social Icons (hidden by default, visible on hover) */}
            <div className="absolute top-1/3 -left-10 transform -translate-y-1/2 group-hover:left-4 transition-all duration-500">
                <div className="flex flex-col space-y-2">
                    <a href={socialIcons.facebook} target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                            alt="Facebook"
                            className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
                        />
                    </a>
                    <a href={socialIcons.twitter} target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                            alt="Twitter"
                            className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
                        />
                    </a>
                    <a href={socialIcons.linkedin} target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                            alt="LinkedIn"
                            className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
                        />
                    </a>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 text-center">
                <h2 className="font-bold text-lg ">{name}</h2>
                <p className="text-gray-600">Experience: {experience}</p>
                <p className="text-gray-500">Available Slots: {availableSlots}</p>
                <Link to={`/trainerDetails/${trainer.id}`} >
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Know More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TrainerCard;