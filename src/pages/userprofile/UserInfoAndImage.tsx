import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"
import { useState } from "react";

export default function UserInfo() {
  const navigate = useNavigate();
  const { user, logout }: any = useAuth()
  const [loading, setloading] = useState(false)

  const handleLogout = () => {
    setloading(true);
    return logout().then(() => {
      navigate('/login')
      setloading(false);
    })
  }
console.log(user)
  return (
    <section>
      <div className="grid">
        <div className="w-32 h-32 mx-auto relative ">
          <img className="rounded-full absolute z-10 w-full shadow-lg h-full object-cover" src={user.photo} alt="" />
          {/* <img className="absolute bottom-1 cursor-pointer -right-3" src="/vectors/camera.svg" alt="" /> */}
        </div>
        <div className="mt-2 grid">
          <div className="flex flex-col gap-3 items-center mx-auto mt-4">
            <p className="text-center text-md capitalize font-medium flex md:flex-col items-center">{user?.username}
              <span>
                {user?.verification_status === 'pending' ? <span className="text-blue-400 px-1 text-sm">Verification is pending</span> : user?.verification_status === 'verified' ? <img className="" src="/vectors/badge.svg" /> : ''}
              </span>
            </p>
            <span className="py-2 text-sm">
              Status: <span className="text-sky-500 capitalize">{user.verification_status}</span>
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`my-16 duration-300 ${loading ? 'pointer-events-none opacity-70' : ''} m-auto px-10 py-2 hover:border-gray-500  border border-gray-300 shadow-sm rounded-md`}>Log out</button>
      </div>
    </section>
  )
}
