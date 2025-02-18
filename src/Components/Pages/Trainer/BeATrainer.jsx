
import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'

const BeATrainer = () => {
    const { user } = useAuth()
    return (
        // <div className='content max-w-4xl mx-auto border-4 bg-white/45 text-black border-yellow-900 rounded-xl m-10 p-10'>

        //     <div className='space-y-3 text-center  bg-white border-2 border-black py-5  rounded-xl shadow-2xl shadow-yellow-900'>
        //     <div className='justify-self-center'>
        //         <img src={user?.photoURL} className='w-56 rounded-xl border-4 border-dotted border-fuchsia-900 p-2' alt="" />
        //     </div>
        //         <h1>Hey! <span className='font-semibold'>{user?.displayName}</span></h1>
        //         <h2>Wanna be a trainer!! Join us</h2>
        //         <Link to={'/beAtrainerform'} className="btn bg-fuchsia-950 text-white">
        //             Be a Trainer
        //         </Link>
        //     </div>
        // </div>
        <div className="mt-6 p-6 bg-[#eafaf0] rounded-lg space-y-3 text-center">
            <div className="flex justify-center">
                <img src={user?.photoURL} className='w-32 rounded-xl border-4 border-dotted border-fuchsia-900 p-2' alt="" />
            </div>
            <h2 className="text-xl font-bold text-gray-700">Want to Become a Trainer?</h2>
            <p className="text-gray-600">Join us and share your expertise with others.</p>
            <Link to={'/beAtrainerform'}>
                {/* <Button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Be a Trainer</Button> */}
                <Button className="inline-flex items-center gap-2 rounded-md bg-[#91edb1] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Be a Trainer
                </Button>
            </Link>
        </div>

    )
}

export default BeATrainer
