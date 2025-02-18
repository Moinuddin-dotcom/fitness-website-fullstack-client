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
                try {
                    const res = await fetch('/MemberShipPlans.json')
                    const data = await res.json()
                    setCardData(data)
                } catch (error) {
                    toast.error("Failed to fetch membership plans");
                }
            }
            cardData()
        }, [])

    } catch (error) {
        toast.error(error)
    }





    return (

        <div className="md:max-w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((cardInfo) => (
                <Card key={cardInfo.Id} className="bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl p-2 md:p-4 lg:p-6 rounded-lg">
                    <CardHeader className="text-center border-b border-gray-700 pb-6">
                        <Typography variant="h5" className="uppercase text-black">{cardInfo.type}</Typography>
                        <Typography variant="h2" className="mt-4 font-semibold">
                            <span className="text-4xl">$</span>{cardInfo.price}
                            <span className="text-lg">/{cardInfo.validity}</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="mt-6">
                        <ul className="space-y-4">
                            {cardInfo.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="h-3 w-3 bg-green-400 rounded-full"></span>
                                    <Typography className="text-gray-300">{benefit}</Typography>
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-6">
                        <Link to={'/paymentPage'}
                            state={{
                                cardId: cardInfo.Id,
                                type: cardInfo.type,
                                price: parseInt(cardInfo.price),
                                validity: cardInfo.validity,
                                benefits: cardInfo.benefits,
                                trainerInfo: { ...trainerInfo },
                            }}>
                            <Button className='bg-green-500 hover:bg-green-600 w-full text-center py-2 rounded-md transition-all'>Join Now</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default PaymentCard
