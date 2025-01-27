import React from 'react'
import usePayment from '../../../../../Hooks/usePayment'
import PriceSection from './BalanceRoutes/PriceSection'
import Chart from './BalanceRoutes/Chart'
import Loading from '../../../Loading'
import useSubscribers from '../../../../../Hooks/useSubscribers'
import PaymentTable from './BalanceRoutes/PaymentTable'

const AdminBalance = () => {
  const [paymentData, isLoading] = usePayment()
  const [subscribers, subscribersLoading] = useSubscribers()

  const price = paymentData.reduce((total, totalPrice) => total + totalPrice.price, 0)
  console.log(price)

  const chartData = {
    Subscribers: subscribers.length,
    Payments: paymentData.length,
  }
  console.log(chartData)
  if (isLoading || subscribersLoading) return <Loading />
  return (
    <div className='my-10'>
      <section className=' max-w-[70vw] mx-auto rounded-t-lg py-5 bg-white grid grid-cols-1 md:grid-cols-2'>
        <div className='w-[20vw] justify-self-center'>
          <PriceSection price={price} />
        </div>
        <div className='w-[40vw] justify-self-center'>
          <Chart chartData={chartData} />
        </div>
      </section>
      <section className='max-w-[90vw] mx-auto'>
        <PaymentTable paymentData={paymentData} />
      </section>
    </div>
  )
}

export default AdminBalance

