import * as React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Loading from '../Pages/Loading';
import useRole from '../../Hooks/useRole';
import AdminRoutes from '../Pages/DashboardPages/Admin/AdminRoutes';
import RealTrainerRoutes from '../Pages/DashboardPages/RealTrainerRoutes/RealTrainerRoutes';
import MemberRoute from '../Pages/DashboardPages/MemberRoutes/MemberRoute';
import { useEffect, useState } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';
// import { path } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import useAuth from '../../Hooks/useAuth';
import { Line } from 'recharts';


const NewDash = () => {
    const { user, logout } = useAuth()
    const [role, isLoading] = useRole();
    const [state, setState] = useState({ left: false });
    const navigate = useNavigate()

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    if (isLoading) return <Loading />;
    const dashItems = {
        admin: [
            { text: 'Balance', path: "/dashboard/admin-balance" },
            { text: 'My Profile', path: "/dashboard/profile-page" },
            { text: ' All Newsletter subscribers', path: "/dashboard/newsletter-subscribers" },
            { text: 'Applied Trainer', path: "/dashboard/applied-trainer" },
            { text: 'All Trainers', path: "/dashboard/all-trainers" },
            { text: 'Add Class', path: "/dashboard/add-new-class" },
            { text: 'Add Forum', path: "/dashboard/add-forum" },
        ],
        trainer: [
            { text: 'My Profile', path: '/dashboard/profile-page' },
            { text: 'Manage Slots', path: '/dashboard/manage-slots' },
            { text: 'Add New Slots', path: '/dashboard/add-new-slots' },
            { text: 'Add Forum', path: '/dashboard/add-forum' }
        ],
        member: [
            { text: 'My Profile', path: '/dashboard/profile-page' },
            { text: 'Activity Log', path: '/dashboard/member-activity' },
            { text: 'Booked Trainer', path: '/dashboard/booked-trainer' }
        ]
    }
    const userRoleMenu = dashItems[role] || []

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ left: open });
    };

    const list = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {userRoleMenu.map(({ text, path }, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => navigate(path)}>
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {/* <Link >Home</Link> */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/")} >
                        {/* <ListItemIcon><MailIcon /></ListItemIcon> */}
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleLogout()} >
                        {/* <ListItemIcon><MailIcon /></ListItemIcon> */}
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch((err) => toast.error(err.message));
    }

    return (
        <div className='poppins bg-[#eafaf0] dark:bg-black'>
            {/* Sidebar Drawer */}
            <div className="fixed z-10 w-full bg-white/80 dark:bg-white/25 flex justify-between px-5 py-5 items-center">
                <div>
                    <div className='flex justify-center items-center gap-2'>
                        <Button onClick={toggleDrawer(true)}>
                            {/* import MenuIcon from '@mui/icons-material/Menu'; */}
                            <MenuIcon className='text-black dark:text-white' sx={{ fontSize: 30 }} />
                        </Button>
                        <div>
                            {role && <h1 className='text-black dark:text-white'> Role: <strong>{role}</strong> </h1>}
                        </div>
                    </div>
                    <SwipeableDrawer
                        anchor="left"
                        open={state.left}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list}
                    </SwipeableDrawer>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="btn btn-ghost btn-circle"
                        >
                            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-blue-600" />}
                        </button>
                    </div>
                    <div>
                        {user && <div>
                            <p className='md:text-xl font-bold text-[#08170d] dark:text-[#e8f7ed] hidden md:flex'>Welcome!</p> <p className='hidden lg:flex text-[#08170d] dark:text-[#91edb1]'>{user?.displayName}</p>
                        </div>}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="second pt-16">
                <Outlet />
            </div>
        </div>
    );
};

export default NewDash;
