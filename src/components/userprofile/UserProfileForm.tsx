import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../Input";

export default function UserProfileForm() {
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
    const onSubmit = (data: any) => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4 ">
                <Input error={errors['names']}  {...register("names")} placeholder="Enter full Name.." label="Full name" />
                <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
            </div>
            <div className="grid grid-cols-2 gap-4  ">
                <Input error={errors['birth']}  {...register("birth")} type="date" placeholder="Date of Birth" label="Date of Birth" />
                <Input error={errors['nationality']} {...register("nationality")} placeholder="Nationality" label="Nationality" />
            </div>
            <div className="grid grid-cols-2 gap-4 ">
                <Input error={errors['password']} type="password" {...register("password")} placeholder="Enter password" label="password" />
                <Input error={errors['confirm_password']} type="password" {...register("confirm_password")} placeholder="Corfirm password" label="corfirm password" />
            </div>
            {/* <div className="pr-4 mt-5 flex flex-col gap-3 ">
                <button type="submit" className="bg-blue-500 pr-4 w-1/4 text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Update</button>
            </div> */}
        </form>
    )
}
