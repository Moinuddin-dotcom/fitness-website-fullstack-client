// import React from 'react'
// import useUser from '../../../../../Hooks/useUser'
// import Loading from '../../../Loading'
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Typography,
//     Tooltip,
//     Button,
// } from "@material-tailwind/react";


// import { useState } from 'react'
// import UpdateProfileModal from './UpdateProfileModal';
// const ProfilePage = () => {
//     let [isOpen, setIsOpen] = useState(false)

//     function open() {
//         setIsOpen(true)
//     }

//     function close() {
//         setIsOpen(false)
//     }




//     const [users, isLoading, refetch] = useUser()
//     if (isLoading) return <Loading />
//     return (
//         <div className='flex justify-center items-center my-28'>
//             <div className='bg-purple-950/80 border-2 border-white rounded-xl  p-10'>
//                 <Card className="px-4 bg-purple-900/5 border-2 border-white text-white">
//                     <CardHeader floated={false} className="border-2 border-white border-dotted">
//                         <img src={users?.photo} alt={users.name} className='h-96' />
//                     </CardHeader>
//                     <CardBody className="text-center">
//                         <Typography variant="h4" color="blue-gray" className="mb-2">
//                             {users.name}
//                         </Typography>
//                         <Typography color="blue-gray" className="font-medium" textGradient>
//                             {users.email}
//                         </Typography>
//                         <Typography color="blue-gray" className="font-medium" textGradient>
//                             {users.role}
//                         </Typography>
//                     </CardBody>
//                     <CardFooter className=" flex justify-center gap-7 p-2">
//                         <Button
//                             onClick={open}
//                             className='px-20 py-5 text-xs flex justify-center items-center gap-2'>
//                             <span className='underline underline-offset-4'>Update Your Profile</span>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
//                             </svg>
//                         </Button>
//                         <UpdateProfileModal close={close} isOpen={isOpen} refetch={refetch} />
                    
//                     </CardFooter>
//                 </Card>
//             </div>
//         </div>
//     )
// }

// export default ProfilePage
import useUser from '../../../../../Hooks/useUser';
import Loading from '../../../Loading';
import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import UpdateProfileModal from './UpdateProfileModal';

const ProfilePage = () => {
    let [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    const [users, isLoading, refetch] = useUser();
    if (isLoading) return <Loading />;

    return (
        <div className="flex justify-center items-center min-h-screen px-4 text-white">
            <div className="w-full max-w-3xl bg-gray-800 shadow-md rounded-lg p-6">
                {/* Profile Header */}
                <div className="flex flex-col items-center border-b pb-6">
                    <img 
                        src={users?.photo} 
                        alt={users.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                    />
                    <h2 className="text-2xl font-semibold mt-3">{users.name}</h2>
                    <p className="text-gray-400">{users.email}</p>
                    <span className="text-indigo-400 font-medium mt-2">Role: {users.role}</span>
                </div>

                {/* Profile Actions */}
                <div className="flex flex-col sm:flex-row justify-center mt-6">
                    <Button 
                        onClick={open}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-md"
                    >
                        Update Profile
                    </Button>
                    <UpdateProfileModal close={close} isOpen={isOpen} refetch={refetch} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;


