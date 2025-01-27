

import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useUser from '../../Hooks/useUser';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Loading from '../Pages/Loading';
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import useRole from '../../Hooks/useRole';
import MemberRoute from '../Pages/DashboardPages/MemberRoutes/MemberRoute';
import RealTrainerRoutes from '../Pages/DashboardPages/RealTrainerRoutes/RealTrainerRoutes';
import AdminRoutes from '../Pages/DashboardPages/Admin/AdminRoutes';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) return <Loading />;

    return (
        <div className="poppins bg-black text-white min-h-screen">
            <Helmet>
                <title>Dashboard | Aura Fusion Gym</title>
            </Helmet>
      //TODO: Remove the link from dashboard
            <Link to={'/'}>
                <h1 className="text-center py-10 font-bold text-2xl">Dashboard</h1>
            </Link>

            <div className="max-w-[90vw] mx-auto border flex justify-between items-center relative">
                <div>
                    <h2 className="py-2 font-bold text-2xl">Hi! {user?.displayName}</h2>
                    <h2>Role: <span className="uppercase">{role}</span></h2>
                </div>

                {/* Mobile view */}
                <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        </MenuButton>

                        <MenuItems
                            className="w-52 origin-top-right rounded-xl border-white/5 bg-white/5 p-1 text-sm text-white transition duration-100 ease-out focus:outline-none"
                        >
                            <MenuItem>
                                <button className="group flex flex-col w-full items-start gap-2 rounded-lg py-1.5 px-3 focus:bg-black">
                                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600">
                                        <NavLink to={'/dashboard/member-activity'}>
                                            Activity Log
                                        </NavLink>
                                    </Button>
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
                {/* Mobile view end */}

                <div className="space-x-4 hidden lg:flex">
                    {/* Admin route */}
                    {role === 'admin' && <AdminRoutes />}

                    {/* Trainer Route */}
                    {role === 'trainer' && <RealTrainerRoutes />}

                    {/* Member route */}
                    {role === 'member' && <MemberRoute />}
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;



