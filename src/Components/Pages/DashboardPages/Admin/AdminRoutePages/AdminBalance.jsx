import React from 'react'
import usePayment from '../../../../../Hooks/usePayment'
import PriceSection from './BalanceRoutes/PriceSection'
import Chart from './BalanceRoutes/Chart'
import Loading from '../../../Loading'
import useSubscribers from '../../../../../Hooks/useSubscribers'
import PaymentTable from './BalanceRoutes/PaymentTable'
import useAuth from '../../../../../Hooks/useAuth'
import useAllUser from '../../../../../Hooks/useAllUser'

const AdminBalance = () => {
  const [paymentData, isLoading] = usePayment()
  const [subscribers, subscribersLoading] = useSubscribers()
  // const { user } = useAuth()
  const [users] = useAllUser()


  const price = paymentData.reduce((total, totalPrice) => total + totalPrice.price, 0)

  if (isLoading || subscribersLoading) return <Loading />
  return (
    <div className='my-10'>
      <section className='  rounded-t-lg py-5 bg-white grid grid-cols-1 md:grid-cols-2'>
        <div className='md:w-[20vw] justify-self-center'>
          <PriceSection price={price} users={users} subscribers={subscribers} />
        </div>
        <div className=' md:w-[40vw] justify-self-center'>
          <Chart
            paymentData={paymentData}
            subscribers={subscribers}
          />
        </div>
      </section>
      <section className=''>
        <PaymentTable paymentData={paymentData} />
      </section>
    </div>
  )
}

export default AdminBalance

