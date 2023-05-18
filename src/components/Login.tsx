import { useForm } from "react-hook-form";
import Input from "./Input";
import Google from "./Google";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Checkbox from "./Checkbox";
import toast from 'react-hot-toast';
import { useState } from "react";
import { authService } from "../services/auth.service";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../config/firebase";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/authContext";

const recaptchaVerifier = new RecaptchaVerifier("2fa-captcha", {
    "size": "invisible",
    "callback": function (response) {
        console.log('captcha solved!', response)
    }
}, auth);

export default function Login() {

    const [loading, setloading] = useState(false)
    const schema = yup.object({
        email: yup.string().required(),
        password: yup.string().required('Password is required').min(6),
    });

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const navigate = useNavigate()

    // const redirect = qs.parse(location.search.replaceAll("?", ''))?.redirect

    const { user, loading: userLoading, setCurrentUser } = useAuth()

    const handleGoogleLogin = async ({ token }) => {
        return authService.googleSignin({ token: token }).then(({ data }) => {
            setCurrentUser(data)
            setloading(false)
            localStorage.setItem('token', data.access_token)
            navigate('/account')
        }).catch((error) => {
            setformError(error?.response?.data?.message)
            setloading(false)
            toast("Login failed")
        })
    }
    const [formError, setformError] = useState('')

    const onSubmit = (data: any) => {
        authService
            .signIn({ email: data.email, password: data.password })
            .then(() => {
                navigate("/2fa");
            })
            .catch((error) => {
                setformError(error?.response?.data?.message)
                setloading(false)
                toast("Login failed")
            });
    };
    return (
        <section>
            <div className='grid lg:grid-cols-1 grid-cols-5 h-screen'>
                <div className='bg-blue-500 flex flex-col justify-center col-span-2'>
                    <img className="max-w-xs mx-auto my-5" src="/vectors/login_vector.svg" alt="" />
                    <div className="flex flex-col my-5 max-w-md mx-auto gap-4 items-center justify-center ">
                        <h4 className="text-center text-white font-medium">Lorem ipsum dolor sit, amet consectetur.</h4>
                        <p onClick={(() => {
                            toast("heloooooo")
                        })} className="text-center font-medium text-[13px] leading-7 text-white/70"> adipisicing elit. Doloremque, autem exercitationem quis impedit, eum nulla quas eveniet similique id.</p>
                    </div>
                </div>
                <div className='col-span-3 max-w-md  w-full m-auto py-10 px-4'>
                    <div className=''>

                        <div>
                            <h1 className="text-[17px] mb-1 font-semibold text-gray-800 text-center">Sign In to continue</h1>
                            <p className="pt-1 text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        {/* <a className={`flex hover:bg-gray-100  items-center gap-3 px-3 py-[10px] text-sm text-slate-500 rounded-[3px] border border-slate-300 justify-center cursor-pointer font-medium text-center ${loading ? 'pointer-events-none opacity-70' : ''}`} onClick={handleGoogleLogin}>
                            <Google />
                            <span>
                                Continue with google
                            </span>
                        </a> */}
                        {/* <GoogleLogin
                            size="large"
                            onSuccess={credentialResponse => {
                                handleGoogleLogin({ token: credentialResponse.credential })
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        /> */}
                    </div>
                    {/* <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-300" />
                        <span className="flex-shrink mx-4 text-sm font-medium text-gray-400">OR</span>
                        <div className="flex-grow border-t border-gray-300" />
                    </div> */}
                    {
                        formError && <div className="text-red-500 bg-red-100 px-3 py-2 rounded-[3px] text-[13px] border border-red-300 mb-3 ">
                            {formError}
                        </div>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-0">
                        <div className=" w-full ">
                            <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
                        </div>
                        <div className="">
                            <Input error={errors['password']} type="password" {...register("password")} placeholder="Enter password" label="password" />
                        </div>
                        <div className="pr-0 mt-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <Checkbox label="I agree terms & conditions" />
                                <Link to="/forgot-password" className="text-blue-500 font-medium text-sm mb-4 ">Forgot password?</Link>
                            </div>
                            <button id="login-btn" type="submit" className={`bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ${loading ? 'pointer-events-none opacity-70' : ''}`}>
                                {loading ? 'loading..' : 'Sign In'}
                            </button>


                            <div className="m-auto text-sm font-medium text-slate-600 lg:flex-col flex gap-10 py-5">
                                <h1>Don't have account? <Link to="/register" className="text-blue-500 ">Register</Link></h1>

                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
