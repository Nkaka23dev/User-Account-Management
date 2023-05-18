import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Fragment } from 'react'
import Protected from '../components/Protected'

export default function PageLayout() {
  const { loading, user } = useAuth()
  const location = useLocation()
  return (
    <Fragment>
      {!loading ? <Protected isSignedIn={user}>
        <Outlet />
      </Protected> : <div className='flex items-center justify-center h-screen w-screen'>
        <img height={100} width={100} src="/spinner.gif" alt="" />
      </div>}
    </Fragment>
  )
}
