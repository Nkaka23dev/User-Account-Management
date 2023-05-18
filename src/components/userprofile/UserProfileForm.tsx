import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../Input";
import { useAuth } from "../../context/authContext"
import { Userdata } from "../Register";

export default function UserProfileForm() {
    const { user }: any = useAuth();

    console.log("User============", user)
    const schema = yup.object({
        names: yup.string().required().label('full names'),
        email: yup.string().required(),
        birth: yup.string().required(),
        nationality: yup.string().required(),
        gender: yup.string().required(),
        martal_status: yup.string().required().label("martal status"),
    });

    const { register, handleSubmit, formState: { errors } } =
        useForm({
            resolver: yupResolver(schema), defaultValues: {
                names: user.username,
                email: user.email,
                birth: user.birth,
                nationality: user.nationality,
                gender: user.gender,
                martal_status: user.martal_status
            }
        });

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pointer-events-none opacity-90">
            <div className="grid grid-cols-2 gap-4 ">
                <Input error={errors['names']}   {...register("names")} placeholder="Enter full Name.." label="Full name" />
                <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
            </div>
            <div className="grid grid-cols-2 gap-4  ">
                <Input error={errors['birth']}  {...register("birth")} type="date" placeholder="Date of Birth" label="Date of Birth" />
                <Input error={errors['martal_status']} {...register("martal_status")} placeholder="martal status" label="Martal status" />
            </div>
            <div className="grid grid-cols-2 gap-4 capitalize  ">
                <Input error={errors['nationality']}  {...register("nationality")} placeholder="Enter nationality" label="Nationality" />
                <Input error={errors['gender']}  {...register("gender")} placeholder="Gender" label="Gender" />
            </div>
            {/* <div className="pr-4 mt-5 flex flex-col gap-3 ">
                <button type="submit" className="bg-blue-500 pr-4 w-1/4 text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Update</button>
            </div> */}
        </form>
    )
}
