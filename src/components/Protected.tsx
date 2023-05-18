import { Navigate, useLocation } from 'react-router-dom'
import { publicURLs } from '../data/publicRoutes'

function Protected({ isSignedIn, children }) {
    const location = useLocation()
    if (!isSignedIn && !publicURLs.includes(location.pathname)) {
        return <Navigate to={`/login?redirect=${location.pathname}`} />
    }
    return children
}
export default Protected