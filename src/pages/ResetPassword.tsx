import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom'
import Input from "../components/Input";
import qs from 'qs'
import { authService } from "../services/auth.service";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import { useState } from "react";

export default function ForgotPassword() {
    const [loading, setloading] = useState(false)

    const navigate = useNavigate();

    const schema = yup.object({
        password: yup.string().required('Password is required').min(6),
        confirm_password: yup.string().required('Password is required').min(6),
    });
    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const token = qs.parse(location.search.replaceAll("?", ''))?.code


    const onSubmit = (data: any) => {
        setloading(true)
        return authService.resetPassword({ password: data.password, token })
            .then(() => {
                toast.success("Password changed, login");
                setloading(false)
                navigate('/login')
            })
            .catch(err => {
                setloading(false)
                toast.error(err.response.data.message)
            })
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
                            <h1 className="text-base mb-2 font-medium text-gray-800 text-center">Reset password</h1>
                            <p className="pt-1 text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <div className=" w-full ">
                            <Input error={errors['password']} {...register("password")} placeholder="Enter email." label="password" />
                        </div>
                        <div className=" w-full ">
                            <Input error={errors['confirm_password']} {...register("confirm_password")} placeholder="Confirm password." label="Confirm password" />
                        </div>

                        <div className="pr-0 mt-5 flex flex-col gap-3">
                            <button type="submit" className={`bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ${loading && 'pointer-events-none opacity-70'} `}>
                                {loading ? <Loading /> : 'Reset Password'}
                            </button>
                            <div className="m-auto text-sm font-medium text-slate-600">
                                <h1>Back to <Link to="/login" className="text-blue-500 ">Login</Link></h1>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}