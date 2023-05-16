import { useForm } from "react-hook-form";
import Input from "./Input";
import Google from "./Google";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom'


export default function Login() {

    const schema = yup.object({
        email: yup.string().required(),
        password: yup.string().required('Password is required').min(6),
    });

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data: any) => console.log(data);
    return (
        <section>
            <div className='grid grid-cols-5 h-screen'>
                <div className='bg-blue-500 flex flex-col justify-center col-span-2'>
                    <img className="max-w-xs mx-auto my-5" src="/vectors/login_vector.svg" alt="" />
                    <div className="flex flex-col my-5 max-w-md mx-auto gap-4 items-center justify-center ">
                        <h4 className="text-center text-white font-medium">Lorem ipsum dolor sit, amet consectetur.</h4>
                        <p className="text-center font-medium text-[13px] leading-7 text-white/70"> adipisicing elit. Doloremque, autem exercitationem quis impedit, eum nulla quas eveniet similique id.</p>
                    </div>
                </div>
                <div className='col-span-3 max-w-md   w-full   m-auto py-10 px-4'>
                    <div className=''>

                        <div>
                            <h1 className="text-lg mb-1 font-medium text-gray-800 text-center">Sign In to continue</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <div className=" w-full ">
                            <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
                        </div>
                        <div className="">
                            <Input error={errors['password']} type="password" {...register("password")} placeholder="Enter password" label="password" />
                        </div>
                        <div className="pr-0 mt-5 flex flex-col gap-3">
                            <button type="submit" className="bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Sign In</button>
                            <div className="relative flex py-5 items-center">
                                <div className="flex-grow border-t border-gray-300" />
                                <span className="flex-shrink mx-4 text-sm font-medium text-gray-400">OR</span>
                                <div className="flex-grow border-t border-gray-300" />
                            </div>
                            <div className="mt-3b">
                                <a className="flex hover:bg-gray-100 cursor-pointer items-center gap-3 px-3 py-[10px] text-sm text-slate-500 rounded-[3px] border border-slate-300 justify-center font-medium text-center" href="">
                                    <Google />
                                    <span>
                                        Sign in with Google
                                    </span>
                                </a>
                            </div>
                            <div className="m-auto flex gap-10 py-5 text-sm font-medium text-slate-600">
                                <h1>Don't have an account? <Link to="/" className="text-blue-500 ">Register</Link></h1>
                                <Link to="/" className="text-blue-500 text-sm">Forgot Password?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
