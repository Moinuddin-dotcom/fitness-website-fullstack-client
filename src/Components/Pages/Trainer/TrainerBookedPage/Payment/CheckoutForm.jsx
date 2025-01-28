import { Button } from '@headlessui/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useBookedTrainer from '../../../../../Hooks/useBookedTrainer';
import useAuth from '../../../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutForm = () => {
    const location = useLocation();
    const { cardId, type, price, validity, benefits, trainerInfo } = location.state || {};


    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState("")
    const [transectionId, setTransectionId] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const navigate = useNavigate();


    const [bookedData, isLoading] = useBookedTrainer()
 

    const bookedTrainerPrice = bookedData.reduce((total, item) => total + item.cardInfoPrice, 0)
 
    useEffect(() => {
        const paymentIntent = async () => {
            const { data } = await axiosSecure.post('/create-payment-intent', { price: price })
          
            setClientSecret(data.clientSecret)
        }
        paymentIntent()
    }, [axiosSecure, bookedTrainerPrice])





    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement)

        if (card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log("Payment error", error)
            setError(error.message)
        } else {
            console.log("Payment method", paymentMethod)
        }

        // Confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("Confirm payment error", confirmError)
           
        } else {
            console.log("Payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                console.log("Transaction Id:", paymentIntent.id)
                setTransectionId(paymentIntent.id)

                // Save the data on database
                const paymentInfo = {
                    bookingUserEmail: user?.email,
                    bookingUserName: user?.displayName,
                    price: price,
                    packageName: type,
                    transactionId: paymentIntent.id,
                    trainerInfo: trainerInfo,
                    date: new Date(),
                    review: ''
                }
                const { data } = await axiosSecure.post('/payments', paymentInfo)
                console.log("Payment saved", data)
                if (data.insertedId) {
                    toast.success("Your payment was successfully")
                    navigate('/dashboard/booked-trainer')
                }
            }
        }
    }


    return (
        <div className='bg-white text-black max-w-[50vw] mx-auto p-5 rounded-xl space-y-5'>
            <form onSubmit={handleSubmit}>
                {/* {bookedData.map(info => */}
                <div>
                    <h1 className='text-lg font-semibold'>Trainer Name: {trainerInfo?.trainerName}</h1>
                    <p>Slot Name: {trainerInfo?.slotName}</p>
                    <p>Package Name: {type}</p>
                    <p>Package Price: {price}$</p>
                    <hr className='border-b-1 mb-4 border-gray-200' />
                    <h1 className='text-lg font-semibold'>Your Name: {user?.displayName}</h1>
                    <p>Your Email: <span className='text-blue-500 underline underline-offset-4 cursor-pointer'>{user?.email}</span></p>
                </div>
                {/* )} */}
                <div>
                    <h1 className='text-xl font-semibold my-10 text-center underline underline-offset-4' >Confirm Your Payment</h1>
                    <CardElement
                        className='border hover:border-2 hover:border-fuchsia-900 p-5 rounded-xl'
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <div className='text-center'>
                        <Button
                            // onClick={() => handleBooking(cardId, type, price, validity, benefits)}
                            // onClick={handleBooking}
                            type="submit" disabled={!stripe} className=' inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-20 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white mr-2 mt-5'>
                            Pay
                        </Button>
                    </div>
                </div>
                {error && <p className='text-red-700'>{error}</p>}
                {transectionId && <p className='text-green-500'>Tour TransectionId is: <strong>{transectionId}</strong></p>}
            </form>
        </div>
    )
}

export default CheckoutForm
