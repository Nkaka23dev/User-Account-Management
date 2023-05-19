import { useForm } from "react-hook-form";
import Input from "../Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { authService } from "../../services/auth.service";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Loading from "../Loading";

export default function ResetPassword() {
    const [loading, setloading] = useState(false)

    const schema = yup.object({
        old_password: yup.string().required('Old password is required').min(6),
        new_password: yup.string().required('Password is required').test(
            "regex",
            "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
            val => {
                const regExp = new RegExp(
                    "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                );
                console.log(regExp.test(val), regExp, val);
                return regExp.test(val);
            }
        ),
        comfirm_password: yup.string()
            .oneOf([yup.ref('new_password')], 'Passwords must match')
    });

    const { register, handleSubmit, reset, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });


    const onSubmit = (data: any) => {
        setloading(true)
        return authService.changePassword({ new_password: data.new_password, old_password: data.old_password }).then(() => {
            toast.success("Password changed, login");
            reset()
        })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message);
                setloading(false)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 max-w-xl ">
            <div className=" w-full ">
                <Input type="password" error={errors['old_password']} {...register("old_password")} placeholder="Old password." label="Old Password" />
            </div>
            <div className=" w-full ">
                <Input type="password" error={errors['new_password']} {...register("new_password")} placeholder="New password." label="New Password" />
            </div>
            <div className="">
                <Input error={errors['comfirm_password']} type="password" {...register("comfirm_password")} placeholder="Comfirm password" label="Comfirm password" />
            </div>
            <div className="pr-0 mt-5 flex flex-col gap-3">
                <button type="submit" className={`bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ${loading && 'pointer-events-none opacity-70'}`}>{loading ? <Loading /> : 'Reset password'}</button>
            </div>
        </form>
    )
}

