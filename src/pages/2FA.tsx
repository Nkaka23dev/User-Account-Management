
import { Link, useNavigate } from 'react-router-dom'
import ReactCodeInput from "react-verification-code-input";
import { useState } from "react";
import { authService } from '../services/auth.service';
import { useAuth } from '../context/authContext';
import { toast } from 'react-hot-toast';

export default function TwoFactorAuth() {
    const [code, setcode] = useState('')

    const [formError, setformError] = useState('')

    const [loading, setloading] = useState(false)

    const { setCurrentUser } = useAuth()

    const navigate = useNavigate()

    const submitForm = () => {
        setloading(false)
        if (code && code.length === 6) {
            return authService.verify2faToken({ code: code }).then(({ data }) => {
                setCurrentUser(data)
                setloading(false)
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                navigate('/account')
            }).catch((e) => {
                setloading(false)
                setformError(e.response.data.message)
                console.log(e.response.data.message)
                toast(e.response.data.message)
            })
        }
    };
    return (
        <section>
            <div className='grid grid-cols-5 h-screen'>
                <div className='bg-blue-500 flex flex-col justify-center col-span-2'>
                    <img className="max-w-xs mx-auto my-5" src="/vectors/password.svg" alt="" />
                    <div className="flex flex-col my-5 max-w-md mx-auto gap-4 items-center justify-center ">
                        <h4 className="text-center text-white font-medium">Lorem ipsum dolor sit, amet consectetur.</h4>
                        <p className="text-center font-medium text-[13px] leading-7 text-white/70"> adipisicing elit. Doloremque, autem exercitationem quis impedit, eum nulla quas eveniet similique id.</p>
                    </div>
                </div>
                <div className='col-span-3 max-w-md   w-full   m-auto py-10 px-4'>
                    <div className=''>

                        <div>
                            <h1 className="text-base mb-2 font-medium text-gray-800 text-center">2FA Authentication</h1>
                            <p className="pt-1 text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">
                                A confirmation link has been sent to your inbox. check your inbox to login.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        {
                            formError && <div className="text-red-500 bg-red-100 px-3 py-2 rounded-[3px] text-[13px] border border-red-300 mb-3 ">
                                {formError}
                            </div>
                        }
                        <div className=" w-full ">
                            <div className="form-group mb-2 ">
                                <div className="label text-sm font-medium text-slate-800 capitalize mb-2">Enter code</div>
                                <div className="mt-2 w-full">
                                    <ReactCodeInput
                                        onComplete={() => {
                                            submitForm();
                                        }}
                                        onChange={(e) => {
                                            setcode(e);
                                        }}
                                        fields={6}
                                        placeholder={["0", "0", "0", "0", "0", "0"]}
                                        className="font-semibold verfiy-inputs"
                                        values={code?.split("")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pr-0 mt-5 flex flex-col gap-3">

                            <button onClick={submitForm} id="login-btn" type="submit" className={`bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ${loading ? 'pointer-events-none opacity-70' : ''}`}>
                                {loading ? 'loading..' : 'Verify 2fA Code'}
                            </button>
                            <div className="m-auto text-sm font-medium text-slate-600">
                                <h1>Back to <Link to="/login" className="text-blue-500 ">Login</Link></h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

