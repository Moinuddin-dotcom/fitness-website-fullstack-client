import { Menu } from '@headlessui/react'
import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import { Link } from 'react-router-dom'

const BeATrainer = () => {
    const { user } = useAuth()
    // const { name, profileImage } = trainer
    return (
        <div className='bg-gray-100 text-black rounded-2xl grid grid-cols-2 py-16'>
            <div className='justify-self-center'>
                <img src={user.photoURL} className='w-60' alt="" />
            </div>
            <div className='space-y-3'>
                <h1>Hey! {user.displayName}</h1>
                <h2>Wanna be a trainer!! Join us</h2>
                <Link to={'/beAtrainerform'} className="btn">
                    Be a Trainer
                </Link>
            </div>
        </div>
    )
}

export default BeATrainer
