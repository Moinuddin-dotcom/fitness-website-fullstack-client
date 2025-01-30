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
    try {
        useEffect(() => {
            const cardData = async () => {
                const res = await fetch('/MemberShipPlans.json')
                const data = await res.json()
                setCardData(data)
            }
            cardData()
        }, [])

    } catch (error) {
      toast.error(error)
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
                                <Button  className='bg-black w-full text-center py-2 rounded-full mt-2'>Join Now</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                )
            }
        </div>
    )
}

export default PaymentCard
