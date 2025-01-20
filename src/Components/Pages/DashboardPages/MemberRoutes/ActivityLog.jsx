import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import ActivityLogModal from './ActivityLogModal'

const ActivityLog = () => {
    const axiosSecure = useAxiosSecure()
    const { data: trainers = [], refetch } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosSecure('/users')
            console.log(res.data)
            return res.data

        }
    })
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Photo & Name </th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Updates</th>
                        </tr>
                    </thead>
                    {
                        trainers.map((post, idx) =>
                            <tbody key={post._id}>
                                {
                                    post.role !== 'admin' &&
                                    <tr key={idx}>
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
                                        <td>{post.role}</td>
                                        <td >{post.status}</td>
                                        {post?.rejectInfo?.rejectReason ? <th>
                                            {/* <button className="btn btn-ghost btn-xs">details</button> */}
                                            <ActivityLogModal post={post} />
                                        </th> : ""}

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

export default ActivityLog

