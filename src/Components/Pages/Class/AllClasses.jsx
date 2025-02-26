import React, { useState } from 'react'
import Loading from '../Loading'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useClasses from '../../../Hooks/useClasses';
import { Avatar, CardFooter, Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Helmet } from 'react-helmet';
import SectionTitles from '../../SharedMarque/SectionTitles';
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useDebounce } from 'use-debounce';

const AllClasses = () => {
    const [searchTerms, setSearchTerms] = useState("");
    // const [debouncedSearch] = useDebounce(searchTerms, 1000)
    // const [adminClasses, isLoading] = useClasses(debouncedSearch)
    const [adminClasses, isLoading] = useClasses()
    // console.log(adminClasses)
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 6;

    const startPage = (currentPage - 1) * itemPerPage
    const endPage = startPage + itemPerPage
    const paginateClass = adminClasses.slice(startPage, endPage)
    const totalPages = Math.ceil(adminClasses.length / itemPerPage)

    const handlePageChange = (e, v) => {
        setCurrentPage(v)
    }

    // const handleSearch = (e) => {
    //     // e.preventDefault()

    //     setSearchTerms(e.target.value);
    // };

    console.log(paginateClass)
    if (isLoading) return <Loading />
    return (
        <div>
            <SectionTitles subHeading={'See Our Classes'} heading={'Classes'} />
            <Helmet>
                <title>All Classes | Aura Fusion Gym</title>
            </Helmet>
            {
                (paginateClass.length <= 0) ?
                    <>
                        <h1 className='flex justify-center items-center h-60 text-4xl font-bold'>No Class Added by Admin</h1>

                    </>
                    :
                    <>
                        {/* <div className="w-full max-w-md mx-auto px-4 ">
                            <Field>
                                <Input
                                    className={clsx(
                                        'mt-3 block w-full rounded-lg border-none dark:bg-white  py-1.5 px-3 text-sm/6 text-white dark:text-black',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                    )}
                                    placeholder='Search'
                                    value={searchTerms}
                                    onChange={handleSearch}
                                />
                            </Field>
                        </div> */}
                        <div className='max-w-[80vw] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                            {paginateClass?.map(classCard =>
                                <Card key={classCard._id} sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={classCard.image}
                                        className='h-48'
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {classCard.className}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {classCard.otherInfo.split(' ').slice(0, 10).join(' ')}...
                                        </Typography>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between border-2 border-t">
                                        <div className="flex items-center -space-x-3">
                                            {classCard?.slot?.map((img, idx) =>
                                                <Link key={idx} to={`/trainerDetails/${img?.bookedById}`}>
                                                    <Tooltip content={img?.bookedByName}>
                                                        <Avatar
                                                            size="sm"
                                                            variant="circular"
                                                            alt={img?.bookedByName}
                                                            src={img?.bookedByImage}
                                                            className="border-2 border-white hover:z-10 w-10 h-10 rounded-full"
                                                        />
                                                    </Tooltip>
                                                </Link>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>
                        <div className='flex justify-center items-center my-5'>

                            <Stack spacing={2} className='bg-white py-2 px-10 rounded-lg'>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="secondary" />
                            </Stack>
                        </div>
                    </>
            }

        </div>
    )
}

export default AllClasses
