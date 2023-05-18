import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Fragment, useEffect } from 'react'

export default function AuthLayout() {
  const { loading, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user && !loading) {
      navigate('/account')
    }
  }, [user, loading])

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
