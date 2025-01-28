import React from 'react'
import useRole from '../Hooks/useRole'
import Loading from '../Components/Pages/Loading'
import { Navigate } from 'react-router-dom'

const AdminOrTrainer = ({ children }) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <Loading />
    if (role === 'admin' || role === 'trainer') return children
    return <Navigate to={'/dashboard'} replace
    // state={{ from: location }} 
    />
}

export default AdminOrTrainer
