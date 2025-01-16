import React from 'react';

const features = [
    {
        title: 'Personalized Workouts',
        description: 'Get tailored workout plans that fit your goals and schedule.',
        icon: '🧘‍♂️',
    },
    {
        title: 'Progress Tracking',
        description: 'Monitor your fitness journey with detailed stats and insights.',
        icon: '📊',
    },
    {
        title: 'Expert Trainers',
        description: 'Learn from certified professionals who guide you every step.',
        icon: '👨‍🏫',
    },
    {
        title: 'Group Classes',
        description: 'Join interactive sessions like yoga, Zumba, and HIIT to stay motivated.',
        icon: '🤸',
    },
    {
        title: '24/7 Gym Access',
        description: 'Work out anytime with round-the-clock access for members.',
        icon: '⏰',
    },
    {
        title: 'Relaxation Zones',
        description: 'Unwind after workouts with saunas, massage services, and more.',
        icon: '🛀',
    },
];

const FeaturedSection = () => {
    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;
