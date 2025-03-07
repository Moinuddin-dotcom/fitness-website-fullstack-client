import React from 'react'
import Loading from '../Components/Pages/Loading'
import useAuth from '../Hooks/useAuth'
import useRole from '../Hooks/useRole'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <Loading />

    if (role === 'admin') return children
    return <Navigate to={'/dashboard'} replace
    // state={{ from: location }} 
    />
}

export default AdminRoute
