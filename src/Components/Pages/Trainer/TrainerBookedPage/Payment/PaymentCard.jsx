import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import Swal from 'sweetalert2';

const PaymentCard = ({ trainerInfo }) => {
    const [cardData, setCardData] = useState([])
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(cardData)
    try {
        useEffect(() => {
            const cardData = async () => {
                const res = await fetch('/public/MemberShipPlans.json')
                const data = await res.json()
                // console.log(data)
                setCardData(data)
            }
            cardData()
        }, [])

    } catch (error) {
        console.log(error)
    }

    const handleBooking = async (cardInfoId, cardInfoType, cardInfoPrice, cardInfoValidity, clues) => {
        try {


            Swal.fire({
                title: "Are you sure?",
                text: `Redirecting for payment: ${cardInfoPrice} / ${cardInfoValidity} `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I want to make payment"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const updateTrainerInfo = {
                        ...trainerInfo,
                        cardInfoId, cardInfoType, cardInfoPrice, cardInfoValidity, clues
                    }
                    const { data } = await axiosSecure.post('/book-trainer', updateTrainerInfo, {
                        headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` },
                    })
                    console.log(data)
                    if (data.insertedId) {
                        // navigate('/paymentPage')
                    }
                }
            });
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="max-w-[80vw] mx-auto grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
            {
                cardData.map((cardInfo) =>

                    <Card key={cardInfo.Id} color="gray" variant="gradient" className=" bg-white/25 h-full p-8">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                        >
                            <Typography
                                variant="small"
                                color="white"
                                className="font-normal uppercase"
                            >
                                {cardInfo.type}
                            </Typography>
                            <Typography
                                variant="h1"
                                color="white"
                                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                            >
                                <span className="mt-2 text-4xl">$</span>{cardInfo.price}{" "}
                                <span className="self-end text-4xl">/{cardInfo.validity}</span>
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-0">
                            <ul className="flex flex-col  gap-4">
                                {
                                    cardInfo.benefits.map((clues, idx) =>
                                        <li key={idx} className="flex flex-grow items-center gap-4">
                                            <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                            </span>
                                            <Typography className="font-normal">{clues}</Typography>
                                        </li>)
                                }



                            </ul>
                        </CardBody>
                        <CardFooter className="mt-12 p-0">
                            {/* <Button
                                // paymentPage
                                onClick={() => handleBooking(cardInfo.Id, cardInfo.type, parseInt(cardInfo.price), cardInfo.validity, cardInfo.benefits)}
                                className='bg-black w-full text-center py-1 rounded-full mt-2'>
                                Join Now
                            </Button> */}
                            <Link to={'/paymentPage'}
                                state={{
                                    cardId: cardInfo.Id,
                                    type: cardInfo.type,
                                    price: parseInt(cardInfo.price),
                                    validity: cardInfo.validity,
                                    benefits: cardInfo.benefits,
                                    trainerInfo: { ...trainerInfo },
                                }}
                            >
                                Join Now
                            </Link>
                        </CardFooter>
                        {/* <div className='hidden'>
                            <PaymentPage handleBooking={handleBooking}
                                cardInfoId={cardInfo.Id}
                                cardInfoType={cardInfo.type}
                                cardInfoPrice={cardInfo.price}
                                cardInfoValidity={cardInfo.validity}
                                cardInfoBenefits={cardInfo.benefits}
                            />

                        </div> */}
                    </Card>
                )
            }
        </div>
    )
}

export default PaymentCard
