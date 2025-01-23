import { Button } from '@headlessui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const RealTrainerRoutes = () => {
    return (
        <div>
            {/* Manage Slots */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/manage-slots'}>
                    Manage Slots

                </NavLink>
            </Button>
            {/* Add New Slots */}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2">
                <NavLink to={'/dashboard/add-new-slots'}>
                    Add New Slots
                </NavLink>
            </Button>
        </div>
    )
}

export default RealTrainerRoutes
