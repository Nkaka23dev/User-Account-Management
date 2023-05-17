import { useForm } from "react-hook-form";
import Input from "./Input";
import Google from "./Google";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from "./Checkbox";
import Select from "./Select";
import { Link, useNavigate } from 'react-router-dom'
import { authService } from "../services/auth.service";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface Userdata {
    names: string;
    email: string;
    gender: string;
    martal_status: string;
    birth: string;
    nationality: string;
    password: string;
    confirm_password: string;
}

export default function Register() {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const data = ['male', 'female', 'others'];
    const martal_status = ["Single", "Married", 'Divorced', 'widowed']

    const [formError, setformError] = useState('')

    const [loginLoading, setloginLoading] = useState(false)

    const schema = yup.object({
        names: yup.string().required().label('full names'),
        email: yup.string().required(),
        birth: yup.string().required(),
        nationality: yup.string().required(),
        gender: yup.string().required(),
        martal_status: yup.string().required().label("martal status"),
        password: yup.string().required('Password is required').min(6),
        confirm_password: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: Userdata) => {
        try {
            setformError('')
            setloginLoading(true)
            const result: any = await authService.createAccount({
                email: data.email,
                password: data.password,
                userName: data.names,
            })
            console.log(result)
            await setDoc(doc(db, "user", result.uid), {
                names: data.names,
                email: data.email,
                gender: data.gender,
                martal_status: data.martal_status,
                birth: data.birth,
                nationality: data.nationality
            });
            navigate('/account')


            setformError('')
        } catch (error) {
            setformError(error.message)
        } finally {
            setloginLoading(false)
        }
        console.log(data)
    }
    const handleGoogleLogin = async () => {
        try {
            setloading(true)
            await authService.signInWithGoogle();
            navigate('/account')

        } catch (error) {
            return ''
        } finally {
            setloading(false)
        }
    }
    return (
        <section>
            <div className='grid lg:grid-cols-1 grid-cols-5 h-screen'>
                <div className='bg-blue-500 flex flex-col justify-center col-span-2'>
                    <img className="max-w-xs mx-auto my-5" src="/vectors/users_vector.svg" alt="" />
                    <div className="flex flex-col my-5 max-w-md mx-auto gap-4 items-center justify-center ">
                        <h4 className="text-center text-white font-medium">Lorem ipsum dolor sit, amet consectetur.</h4>
                        <p className="text-center font-medium text-[13px] leading-7 text-white/70"> adipisicing elit. Doloremque, autem exercitationem quis impedit, eum nulla quas eveniet similique id.</p>
                    </div>
                </div>
                <div className='col-span-3 lg:max-w-5xl max-w-xl lg:mx-5 m-auto py-10 px-4 sm:px-0 '>
                    <div className=''>

                        <div>
                            <h1 className="text-lg mb-1 font-medium text-gray-800 ">Create your account</h1>
                            <p className="pt-2 text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">Let's get you all set up so you can verify your personal account and begin
                                setting up your profile.</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="mt-3b">
                            <a className={`flex hover:bg-gray-100  items-center gap-3 px-3 py-[10px] text-sm text-slate-500 rounded-[3px] border border-slate-300 justify-center cursor-pointer font-medium text-center ${loading ? 'pointer-events-none opacity-70' : ''}`} onClick={handleGoogleLogin}>
                                <Google />
                                <span>
                                    Continue with google
                                </span>
                            </a>
                        </div>

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-300" />
                            <span className="flex-shrink mx-4 text-sm font-medium text-gray-400">OR</span>
                            <div className="flex-grow border-t border-gray-300" />
                        </div>
                        {
                            formError && <div className="text-red-500 bg-red-100 px-3 py-2 rounded-[3px] text-[13px] border border-red-300 mb-3 ">
                                {formError}
                            </div>
                        }
                        <div className="grid sm:grid-cols-1 grid-cols-2 gap-4  ">
                            <Input error={errors['names']}  {...register("names")} placeholder="Enter full Name.." label="Full name" />
                            <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
                        </div>
                        <div className="grid sm:grid-cols-1 grid-cols-2 gap-4  ">
                            <Select data={data} label="Select Gender" error={errors['gender']}  {...register("gender")} />
                            <Select data={martal_status} label="Martal status" error={errors['martal_status']}  {...register("martal_status")} />
                        </div>
                        <div className="grid sm:grid-cols-1 grid-cols-2 gap-4  ">
                            <Input error={errors['birth']}  {...register("birth")} type="date" placeholder="Date of Birth" label="Date of Birth" />
                            <Input error={errors['nationality']} {...register("nationality")} placeholder="Nationality" label="Nationality" />
                        </div>
                        <div className="grid sm:grid-cols-1 grid-cols-2 gap-4  ">
                            <Input error={errors['password']} type="password" {...register("password")} placeholder="Enter password" label="password" />
                            <Input error={errors['confirm_password']} type="password" {...register("confirm_password")} placeholder="Corfirm password" label="corfirm password" />
                        </div>
                        <div>
                            <Checkbox label="I agree terms & conditions" />
                        </div>

                        <div className="pr-4 mt-5 flex flex-col gap-3">
                            <button type="submit" className={`bg-blue-500 pr-4 w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600   ${loginLoading ? 'pointer-events-none opacity-70' : ''}`}>
                                {loginLoading ? 'loading...' : 'Create Account'}
                            </button>
                            <div className="m-auto text-sm font-medium text-slate-600">
                                <h1>Already have an account? <Link to="/login" className="text-blue-500 ">Log in</Link></h1>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
