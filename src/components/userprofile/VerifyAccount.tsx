import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../Input";
import { authService } from "../../services/auth.service";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/authContext";

export default function VerifyAccount() {
    const schema = yup.object({
        national_id: yup.string().required().label('Passport or National ID'),
        file: yup.string().required(),
    });

    const { register, handleSubmit, setValue, reset, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) });

    const { reloadAuth } = useAuth()


    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append('image', file);

        return fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setValue('file', data.url)
                console.log('Image URL:', data.url);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const onSubmit = (data: any) => {
        authService.verifyUser({ file: data.file, national_id: data.national_id })
            .then(() => {
                reset()
                reloadAuth()
                toast("Data Successfully submitted, Pleased for verfication");
            })
            .catch(err => {
                toast("error occured")
                console.log(err)
            })
    }

    const { user }: any = useAuth()

    return (
        <div>
            {user?.verification_status === 'unverified' ? <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4 ">
                    <Input error={errors['national_id']}  {...register("national_id")} placeholder="Enter full Name.." label="National ID or passport numbers" />
                    <div className=" ">
                        <label className="text-sm mb-[6px] capitalize block text-gray-600 font-medium " htmlFor="photo">Upload your profile picture <span className='text-red-500'>*</span> </label>
                        <div className={`border rounded-[3px] px-3 py-3 ${errors['file']?.message ? 'border-red-400 ' : 'border-slate-200 '}`}>
                            <input onChange={(e) => handleUpload(e.target.files[0])} type="file" className="font-medium text-sm text-slate-600" />
                        </div>
                        {errors['file'] && <span className='text-red-500 text-[12px] capitalize font-medium'>*{errors['file'].message as string}</span>}

                    </div>
                </div>
                <div className="pr-4 mt-5 flex flex-col gap-3 ">
                    <button type="submit" className="bg-blue-500 pr-4 w-1/4 text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Verify</button>
                </div>
            </form> : <div>
                {user?.verification_status === 'pending' ? 'Verification is pending' : user?.verification_status === 'verified' ? 'Your account us verirified' : 'something went wrong'}
            </div>}

        </div>
    )
}
