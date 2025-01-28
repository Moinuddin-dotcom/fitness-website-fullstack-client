
import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import { Link } from 'react-router-dom'

const BeATrainer = () => {
    const { user } = useAuth()
    return (
        <div className='content max-w-4xl mx-auto border-4 bg-white/45 text-black border-yellow-900 rounded-xl m-10 p-10'>
            
            <div className='space-y-3 text-center  bg-white border-2 border-black py-5  rounded-xl shadow-2xl shadow-yellow-900'>
            <div className='justify-self-center'>
                <img src={user?.photoURL} className='w-56 rounded-xl border-4 border-dotted border-fuchsia-900 p-2' alt="" />
            </div>
                <h1>Hey! <span className='font-semibold'>{user?.displayName}</span></h1>
                <h2>Wanna be a trainer!! Join us</h2>
                <Link to={'/beAtrainerform'} className="btn bg-fuchsia-950 text-white">
                    Be a Trainer
                </Link>
            </div>
        </div>
    )
}

export default BeATrainer
