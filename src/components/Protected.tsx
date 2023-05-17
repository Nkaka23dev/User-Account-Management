import { Navigate, useLocation } from 'react-router-dom'
import { publicURLs } from '../data/publicRoutes'
import toast from 'react-hot-toast';
import { useEffect } from 'react';

function Protected({ isSignedIn, children }) {
    const location = useLocation()
    if (!isSignedIn && !publicURLs.includes(location.pathname)) {
        return <Navigate to={`/login?redirect=${location.pathname}`} />
    }
    return children
}
export default Protected