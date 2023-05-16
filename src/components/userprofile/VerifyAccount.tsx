import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../Input";

export default function VerifyAccount() {
    const schema = yup.object({
        names: yup.string().required().label('Passport or National ID'),
        email: yup.string().required(),
    });

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });
    const onSubmit = (data: any) => console.log(data);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4 ">
                    <Input error={errors['names']}  {...register("names")} placeholder="Enter full Name.." label="National ID or passport numbers" />
                    <Input type="file" error={errors['email']} {...register("email")} placeholder="Enter email." label="Upload your National ID Photo " />
                </div>
                <div className="pr-4 mt-5 flex flex-col gap-3 ">
                    <button type="submit" className="bg-blue-500 pr-4 w-1/4 text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Verify</button>
                </div>
            </form>
        </div>
    )
}
