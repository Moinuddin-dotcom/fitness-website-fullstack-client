import React from 'react'
import { Link } from 'react-router-dom'

const CommunityRoutes = () => {
    return (
        <div>
            <section className="dark:bg-black border-4 rounded-b-lg dark:text-white">
                <div className="container mx-auto flex flex-col items-center px-4  text-center py-5 xl:max-w-3xl">
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">B
                        <span className="dark:text-cyan-600">logs</span>
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">10 Must-Try Workouts for Building Strength and Endurance</p>
                    <div className="flex flex-wrap justify-center">
                        <Link to={'/'}>
                            <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-cyan-600 dark:text-gray-50">Go to Home Page</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CommunityRoutes
