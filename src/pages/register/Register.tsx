import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from "../../components/checkbox/Checkbox";
import Select from "../../components/select/Select";
import { Link, useNavigate } from 'react-router-dom'
import { authService } from "../../services/auth.service";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../components/loading/Loading";

export interface Userdata {
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
    const [registerLoading, setregisterLoading] = useState(false);
    const navigate = useNavigate();
    const data = ['male', 'female', 'others'];
    const martal_status = ["Single", "Married", 'Divorced', 'widowed']

    const schema = yup.object({
        names: yup.string().required().label('full names'),
        email: yup.string().email().required(),
        birth: yup.string().required(),
        nationality: yup.string().required(),
        photo: yup.string(),
        gender: yup.string().required(),
        martal_status: yup.string().required().label("martal status"),
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
        ),
        confirm_password: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const [formError, setformError] = useState('')

    const onSubmit = (data: any) => {
        setregisterLoading(true)
        authService
            .signUp(data)
            .then(() => {
                navigate("/2fa");
            })
            .catch((error) => {
                setformError(error?.response?.data?.message)
                setregisterLoading(false)
                toast("Login failed")
            });
    };

    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append('image', file);
        setloading(true)
        return fetch(import.meta.env.VITE_API_URL + '/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setValue('photo', data.url)
                console.log('Image URL:', data.url);
                toast.success("Image uploaded successfully, click submit")
                setloading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Try again");
                setloading(false)
            });
    }
    return (
        <section className="lg:px-2">
            <div className='grid lg:grid-cols-1 grid-cols-5 h-screen'>
                <div className='bg-blue-500  lg:order-2 flex flex-col justify-center col-span-2'>
                    <img className="max-w-xs mx-auto my-5" src="/vectors/users_vector.svg" alt="" />
                    <div className="flex lg:px-4  flex-col my-5 max-w-md mx-auto gap-4 items-center justify-center ">
                        <h4 className="text-center  text-white font-medium">User account management system Sign Up.</h4>
                        <p className="text-center font-medium text-[13px] leading-7 text-white/70"> All field market with (*) are required, You need to provide all information to sign up.</p>
                    </div>
                </div>
                <div className='col-span-3 lg:order lg:max-w-5xl max-w-xl lg:mx-5 m-auto py-10 px-4 sm:px-0 '>
                    <div className='mb-6'>

                        <div>
                            <h1 className="text-lg mb-1 font-medium text-gray-800 ">Create your account</h1>
                            <p className="pt-2 text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">Let's get you all set up so you can verify your personal account and begin
                                setting up your profile.</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="mt-3b">
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
                        <div className="mb-4 ">
                            <label className="text-sm mb-[6px] capitalize block text-gray-600 font-medium " htmlFor="photo">Upload your profile picture <span className='text-red-500'>*</span> </label>
                            <div className={`border rounded-[3px] px-3 py-3 ${errors['photo']?.message ? 'border-red-400 ' : 'border-slate-200 '}`}>
                                <input onChange={(e) => handleUpload(e.target.files[0])} type="file" className={` ${loading && 'pointer-events-none opacity-70'} font-medium text-sm text-slate-600`} />
                                {loading && <Loading invert />}
                            </div>
                            {errors['photo'] && <span className='text-red-500 text-[12px] capitalize font-medium'>*{errors['photo'].message as string}</span>}

                        </div>
                        <div>
                            <Checkbox label="I agree terms & conditions" />
                        </div>

                        <div className="pr-4 mt-5 flex flex-col gap-3">
                            <button type="submit" className={`bg-blue-500 pr-4 w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600   ${registerLoading ? 'pointer-events-none opacity-70' : ''}`}>
                                {registerLoading ? <Loading /> : 'Create Account'}
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
