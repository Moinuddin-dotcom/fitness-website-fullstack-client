import React from 'react'

const Subscriber = () => {
    return (
        <div className="bg-gray-100 py-16 px-6">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Stay Updated</h2>
                <p className="text-gray-600 mt-2">Subscribe to our newsletter and never miss an update!</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Subscribe Now
                    </button>
                </form>
                {message && <p className="mt-4 text-green-600">{message}</p>}
            </div>
        </div>
    )
}

export default Subscriber
