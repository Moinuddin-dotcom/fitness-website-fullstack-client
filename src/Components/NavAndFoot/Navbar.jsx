import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import websiteLogo from '../../../src/assets/Animation - Website-logo.json'
import Lottie from 'lottie-react'
import useAuth from '../../Hooks/useAuth'


// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
} from '@heroicons/react/16/solid'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navLinks = <>
        <NavLink to={'/'} className={({ isActive }) => isActive ? " underline underline-offset-4 text-green-400 font-semibold" : ""} >Home</NavLink>
        <NavLink to={'/trainer'} className={({ isActive }) => isActive ? " underline underline-offset-4 text-green-400 font-semibold" : ""}>Trainer</NavLink>
        <NavLink to={'/classes'} className={({ isActive }) => isActive ? " underline underline-offset-4 text-green-400 font-semibold" : ""}>Classes </NavLink>
        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? " underline underline-offset-4 text-green-400 font-semibold" : ""}>Dashboard</NavLink>
        <NavLink to={'/community'} className={({ isActive }) => isActive ? " underline underline-offset-4 text-green-400 font-semibold" : ""}>Community</NavLink>

    </>

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch((err) => toast.error(err.message));
    }


    return (
        <div>
            <Disclosure as="nav" className=" border">
                <div className="mx-auto max-w-[95vw] border px-2 py-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                    </svg>

                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <button className="group flex flex-col w-full items-start gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black">
                                            {navLinks}
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                        <div className="flex flex-1 items-center justify-center  sm:justify-start">
                            <Link to={'/'}>
                                <Button className="inline-flex items-center rounded-md bg-gray-700 px-2  text-sm/6  text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                    <div >
                                        <Lottie animationData={websiteLogo} className='h-12 pl-2' ></Lottie>
                                    </div>
                                    <div className='hidden lg:flex flex-col'>
                                        <h1 className='font-bold text-xl text-start'>Aura Fusion Gym</h1>
                                        <h3 className=' text-green-500 text-sm text-start'>Fitness & Yoga</h3>
                                    </div>
                                </Button>
                            </Link>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navLinks}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            {
                                user && user?.email ? <div>
                                    <p className='md:text-xl font-bold'>Welcome!</p> <p className='hidden lg:flex text-green-500'>{user?.displayName}</p>
                                </div>
                                    :
                                    <Link to={'/login'}>
                                        <Button className="inline-flex items-center gap-2 rounded-md bg-[#82b440] py-1.5 px-3 text-sm/6 font-bold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ffc107] data-[open]:bg-[#ffc107] data-[focus]:outline-1 data-[focus]:outline-white">
                                            Join us
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-4 font-extrabold">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>

                                        </Button>
                                    </Link>
                            }

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        {
                                            user && user?.email &&
                                            <img
                                                alt=""
                                                src={user?.photoURL}
                                                className="size-10 rounded-full"
                                            />
                                        }

                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Your Profile
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            onClick={handleLogout}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Sign out
                                        </Button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    )
}

export default Navbar
