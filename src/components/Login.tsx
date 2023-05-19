import { useForm } from "react-hook-form";
import Input from "./Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom'
import Checkbox from "./Checkbox";
import toast from 'react-hot-toast';
import { useState } from "react";
import { authService } from "../services/auth.service";



export default function Login() {
    const [usePassword, setusePassword] = useState(false)
    const [loading, setloading] = useState(false)
    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required('Password is required').test(
            "regex",
            "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
            val => {
                const regExp = new RegExp(
                    "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                );
                console.log(regExp.test(val), regExp, val);
                return regExp.test(val);
            }
        )
    });

    const { register, reset, handleSubmit, getValues, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const navigate = useNavigate()

    const [formError, setformError] = useState('')

    const onSubmit = (data: any) => {
        setloading(true)
        if (usePassword)
            return authService
                .signIn({ email: data.email, password: data.password })
                .then(() => {
                    toast("Please check your email for authorization code")
                    navigate("/2fa");
                })
                .catch((error) => {
                    setformError(error?.response?.data?.message)
                    setloading(false)
                    toast.error("Login failed")
                });
    };


    const [sendingLink, setsendingLink] = useState(false)

    const handleSendLoginLink = () => {
        if (getValues().email) {
            setsendingLink(true)
            return authService.sendLoginLink({ email: getValues().email }).then(() => {
                setsendingLink(false)
                reset()
                toast.success("login link sent. check your inbox")
            }).catch((e) => {
                toast.error(e.response.data.message)
                setsendingLink(false)
                reset()
                console.log(e)
            })
        }
    }
    return (
        <section className="lg:px-2">
            <div className='grid lg:grid-cols-1 grid-cols-5 h-screen'>
                <div className='bg-blue-500 lg:order-2 flex flex-col justify-center col-span-2'>
                    <img className="max-w-xs mx-auto my-5" src="/vectors/login_vector.svg" alt="" />
                    <div className="flex flex-col my-5 max-w-md lg:px-4 mx-auto gap-4 items-center justify-center ">
                        <h4 className="text-center text-white font-medium">User account management system Sign In.</h4>
                        <p onClick={(() => {
                            toast("heloooooo")
                        })} className="text-center font-medium text-[13px] leading-7 text-white/70"> You need email and password to sign in, if you sign up with email you will get a magic link on your email.</p>
                    </div>
                </div>
                <div className='lg:order-1 col-span-3 max-w-md  w-full m-auto py-10 px-4'>
                    <div className=''>

                        <div>
                            <h1 className="text-[17px] mb-1 font-semibold text-gray-800 text-center">Sign In to continue</h1>
                            <p className="pt-1 text-center text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">
                                User account management system .
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">

                    </div>
                    {
                        formError && <div className="text-red-500 bg-red-100 px-3 py-2 rounded-[3px] text-[13px] border border-red-300 mb-3 ">
                            {formError}
                        </div>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-0">
                        <div className=" w-full ">
                            <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
                        </div>
                        {
                            usePassword && <div className="">
                                <Input error={errors['password']} type="password" {...register("password")} placeholder="Enter password" label="password" />
                            </div>
                        }
                        <div className="pr-0 mt-5 flex flex-col gap-3">
                            <div className="flex md:flex-col items-center md:items-start md:gap-2 justify-between">
                                <Checkbox label="I agree terms & conditions" />
                                <Link to="/forgot-password" className="text-blue-500 font-medium text-sm ">Forgot password?</Link>
                            </div>

                            <button onClick={(e) => {
                                if (!usePassword) {
                                    e.preventDefault()
                                    setusePassword(true)

                                }
                            }} id="login-btn" type={usePassword ? "submit" : "button"} className={`bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ${loading ? 'pointer-events-none opacity-70' : ''}`}>
                                Login with password
                            </button>
                            <button onClick={() => {
                                setusePassword(false)
                                handleSendLoginLink()
                            }} id="login-btn" className={`bg-blue-100  w-full text-blue-500 font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-100 ${sendingLink ? 'pointer-events-none opacity-70' : ''}`}>
                                Sigin in with email
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
