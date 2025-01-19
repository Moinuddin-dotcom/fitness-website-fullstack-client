import React from 'react'
import useRole from '../Hooks/useRole'
import Loading from '../Components/Pages/Loading'
import { Navigate } from 'react-router-dom'

const TrainerRoute = ({ children }) => {
    // const { user, loading } = useAuth()
    const [role, isLoading] = useRole()
    // const location = useLocation()
    if (isLoading) return <Loading />

    if (role === 'trainer') return children

    return <Navigate to={'/dashboard'}
    // state={{ from: location }} replace
    />
}

export default TrainerRoute
