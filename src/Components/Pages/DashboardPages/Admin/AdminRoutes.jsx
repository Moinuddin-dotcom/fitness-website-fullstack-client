import React from 'react'
import { Button } from '@headlessui/react'

import { NavLink } from 'react-router-dom'
// import React from 'react'

const AdminRoutes = () => {
    return (
        <div>
            {/* < Balance /> */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/admin-balance'}>
                    Balance
                </NavLink>
            </Button>
            {/* < My Profile /> */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/profile-page'}>
                    My Profile
                </NavLink>
            </Button>
            {/* Applied Trainer */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/newsletter-subscribers'}>
                    All Newsletter subscribers
                </NavLink>
            </Button>
            {/* Applied Trainer */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/applied-trainer'}>
                    Applied Trainer
                </NavLink>
            </Button>
            {/* All Trainer */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/all-trainers'}>
                    All Trainers
                </NavLink>
            </Button>
            {/* All Trainer */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/add-new-class'}>
                    Add Class
                </NavLink>
            </Button>
            {/* add-forum */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/add-forum'}>
                    Add Forum
                </NavLink>
            </Button>
        </div>
    )
}

export default AdminRoutes
