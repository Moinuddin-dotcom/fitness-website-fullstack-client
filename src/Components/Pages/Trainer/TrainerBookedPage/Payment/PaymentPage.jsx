import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import CheckoutForm from './CheckoutForm'



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK)
const PaymentPage = () => {
   
    return (
        <div className='my-10'>
            {/* Payment page Here */}
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default PaymentPage
