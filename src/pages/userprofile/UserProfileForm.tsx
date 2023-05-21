import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../../components/input/Input";
import { useAuth } from "../../context/authContext"

export default function UserProfileForm() {
    const { user }: any = useAuth();
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
                martal_status: user.martal_status,
                age: new Date().getFullYear() - new Date(user.birth).getFullYear()
            }
        });

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pointer-events-none opacity-90">
            <div className="grid md:grid-cols-1 grid-cols-2 gap-4 ">
                <Input error={errors['names']}   {...register("names")} placeholder="Enter full Name.." label="Full name" />
                <Input error={errors['email']} {...register("email")} placeholder="Enter email." label="Email" />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4  ">
                <Input error={errors['birth']}  {...register("birth")} type="date" placeholder="Date of Birth" label="Date of Birth" />
                <Input error={errors['age']}  {...register("age")} type="number" placeholder="Age" label="Age" />
                <Input error={errors['martal_status']} {...register("martal_status")} placeholder="martal status" label="Martal status" />
            </div>
            <div className="grid md:grid-cols-1 grid-cols-2 gap-4 capitalize  ">
                <Input error={errors['nationality']}  {...register("nationality")} placeholder="Enter nationality" label="Nationality" />
                <Input error={errors['gender']}  {...register("gender")} placeholder="Gender" label="Gender" />
            </div>
        </form>
    )
}
