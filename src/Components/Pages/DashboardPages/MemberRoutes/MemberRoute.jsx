import React from 'react'
import ActivityLog from './ActivityLog'
import { Button } from '@headlessui/react'
import { NavLink } from 'react-router-dom'

const MemberRoute = () => {
    return (
        <div>
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <NavLink to={'/dashboard/member-activity'}>
                    Activity Log
                    {/* <ActivityLog /> */}

                </NavLink>
            </Button>
        </div>
    )
}

export default MemberRoute
