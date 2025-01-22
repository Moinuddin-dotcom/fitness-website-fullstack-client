import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading'

const AllClasses = () => {

    const axiosSecure = useAxiosSecure()
    const { data: allClass = [], isLoading } = useQuery({
        queryKey: ['allClass'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/classes')
            return data
        }
    })
    if (isLoading) return <Loading />
    console.log(allClass)

    return (
        <div>
            {
                (allClass.length <= 0) ?
                    <>
                        <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>

                    </>
                    :
                    <>
                        All classes here
                        {allClass.length}
                    </>
            }

        </div>
    )
}

export default AllClasses
