import { useForm } from "react-hook-form";
import Input from "../Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom'

export default function ResetPassword() {

    const schema = yup.object({
        email: yup.string().required(),
        password: yup.string().required('Password is required').min(6),
    });

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data: any) => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 max-w-xl ">
            <div className=" w-full ">
                <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Old Password" />
            </div>
            <div className=" w-full ">
                <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="New Password" />
            </div>
            <div className="">
                <Input error={errors['password']} type="password" {...register("password")} placeholder="Enter password" label="Comfirm password" />
            </div>
            <div className="pr-0 mt-5 flex flex-col gap-3">
                <button type="submit" className="bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Reset password</button>

                <div className="m-auto flex gap-10 py-5 text-sm font-medium text-slate-600">
                    <h1>Don't have an account? <Link to="/register" className="text-blue-500 ">Register</Link></h1>
                </div>
            </div>
        </form>
    )
}

