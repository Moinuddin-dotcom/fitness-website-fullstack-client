import React from 'react'
import Loading from '../Components/Pages/Loading'
import useAuth from '../Hooks/useAuth'
import useRole from '../Hooks/useRole'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
    // const { user, loading } = useAuth()
    const [role, isLoading] = useRole()
    // const location = useLocation()
    if (isLoading) return <Loading />

    if (role === 'admin') return children
    return <Navigate to={'/dashboard'}
    // state={{ from: location }} replace
    />
}

export default AdminRoute
