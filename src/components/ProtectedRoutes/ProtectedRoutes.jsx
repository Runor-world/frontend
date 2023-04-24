import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector( store => store.auth)

    if(!user || !user?.role === 'admin') return <Navigate to='login' />
    return children
}

export default ProtectedRoutes