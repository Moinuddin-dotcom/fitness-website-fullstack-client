import React, { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Description, Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useUser from '../../../../Hooks/useUser';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ModalOfReview = ({ isOpen, close }) => {
    const [rating, setRating] = useState(2);
    const [feedback, setFeedback] = useState("")
    const axiosSecure = useAxiosSecure()
    const [users,] = useUser()
    const navigate = useNavigate()
    // console.log(users)
    const handleSubmit = async () => {
        const reviewData = {
            feedbackUserName: users?.name,
            feedbackUserPhoto: users?.photo,
            feedback: feedback,
            rating: rating,
        };
        console.log(reviewData);

        try {
            const { data } = await axiosSecure.post('/reviews', reviewData)
            console.log("Review posted successfully", data)
            toast.success("Your review has been posted successfully")
            close()
            navigate('/trainer')
        } catch (error) {
            console.log('Can not submit feedback', error);
        }
    }

    return (
        <div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-black border-2 border-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <div className="w-full max-w-md px-4">
                                <Field>
                                    <Label className="text-sm/6 font-medium text-white">Write Your Feedback</Label>
                                    <Textarea
                                        className={clsx(
                                            'mt-3 block w-full resize-none rounded-lg border-none bg-white/55 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        rows={3}
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                </Field>
                            </div>
                            {/* textarea */}
                            {/* rating */}

                            <Box sx={{ '& > legend': { mt: 5, py: 1 } }} className="bg-white/5 rounded-xl mt-10 px-5 text-center" >
                                <Typography variant="h6" className="text-sm/6 font-medium text-white">Rate this trainer:</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                            </Box>

                            {/* rating */}


                            <div className="mt-4 text-center">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    // onClick={close}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ModalOfReview
