import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuth from '../../../../Hooks/useAuth'
import Loading from '../../Loading'

// import { useForm } from 'react-hook-form'

const AppliedTrainer = () => {





    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: appliedTrainers = [], isLoading, refetch } = useQuery({
        queryKey: ['appliedTrainers', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`)
            // console.log(data)
            return data

        }
    })
    if (isLoading) return <Loading />
    console.log(appliedTrainers)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Photo & Name </th>
                            <th>Email</th>
                            {/* <th>Role</th> */}
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        appliedTrainers.map((post, idx) =>

                            <tbody key={post._id}>
                                {
                                    (post.status === 'Pending') && <tr >
                                        {/* <th>{idx + 1}</th> */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={post.photoURL}
                                                            alt="Photo" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{post.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {post.email}
                                        </td>
                                        {/* <td>{post.role}</td> */}
                                        <td >
                                            {post.status ? <p className={`${post.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>{post.status}</p> : <p className='text-red-500'>Unavailable</p>}
                                        </td>
                                        <th>
                                            <Link to={`/dashboard/applied-trainer-details/${post._id}`}>
                                                <button className="btn btn-ghost btn-xs">details</button>
                                            </Link>
                                        </th>
                                    </tr>
                                }
                            </tbody>
                        )
                    }

                </table>
            </div>


        </div>
    )
}

export default AppliedTrainer
