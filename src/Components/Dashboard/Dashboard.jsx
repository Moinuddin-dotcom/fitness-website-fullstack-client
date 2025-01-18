import React from 'react'
import useAuth from '../../Hooks/useAuth'
import useUser from '../../Hooks/useUser'
import { NavLink, Outlet } from 'react-router-dom'
import Loading from '../Pages/Loading'
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import useRole from '../../Hooks/useRole'


const Dashboard = () => {
    const { user, loading } = useAuth()
    // const [isLoading, users] = useUser()
    // console.log(users)
    const [role, isLoading] = useRole()
    console.log(role)

    if (loading, isLoading) return <Loading />

    // const isAdmin = true;
    return (
        <div className='poppins bg-black text-white'>
            <h1 className='text-center py-10 font-bold text-2xl'>Dashboard</h1>
            <div className='max-w-[90vw] mx-auto border flex justify-between items-center relative'>
                <div>
                    {/* {users ? (
                        users.map((user) =>
                            <div key={user._id}>
                                <h2 className=' py-2 font-bold text-2xl'>Hi! {user.name}</h2>
                                <p>You are our honourable <b>({user.role})</b> </p>
                            </div>)) : ""} */}
                    <h2 className=' py-2 font-bold text-2xl'>Hi! {user?.displayName}</h2>
                    <h2 >Role: <span className='uppercase'>{role}</span></h2>
                    {/* {user.displayName} */}
                </div>
                {/* mobile view */}
                <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>

                        </MenuButton>

                        <MenuItems
                            transition
                            anchor="bottom end"
                            className="w-52 origin-top-right rounded-xl  border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <MenuItem>
                                <button className="group flex flex-col w-full items-start gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black">
                                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                        <NavLink to={'/dashboard/member-activity'}>
                                            Activity Log
                                        </NavLink>
                                    </Button>

                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
                {/* mobile view end */}
                <div className='space-x-4 hidden lg:flex'>

                    {/* Admin route */}
                    {
                        role === 'admin' && <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                            <NavLink to={'/dashboard/applied-trainer'}>
                                Applied Trainer
                            </NavLink>
                        </Button>
                    }
                    {/* Seller Route */}
                    {
                        role === 'seller' && ""
                    }


                    {/* Member route */}
                    {
                        role === 'member' && <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                            <NavLink to={'/dashboard/member-activity'}>
                                Activity Log
                            </NavLink>
                        </Button>
                    }





                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
