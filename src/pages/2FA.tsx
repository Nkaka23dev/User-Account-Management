
import { Link } from 'react-router-dom'
import ReactCodeInput from "react-verification-code-input";
import { useState } from "react";

export default function TwoFactorAuth() {
    const [code, setcode] = useState('')

    const submitForm = () => console.log(code);
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
                            <h1 className="text-base mb-2 font-medium text-gray-800 text-center">2FA Authentication</h1>
                            <p className="pt-1 text-sm leading-7 font-medium text-gray-500 max-w-xl text-md">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </p>
                        </div>
                    </div>
                    <form className="mt-5">
                        <div className=" w-full ">
                            <div className="form-group mb-2 ">
                                <div className="label text-sm font-medium text-slate-800 capitalize mb-2">Enter code</div>
                                <div className="mt-2 w-full">
                                    <ReactCodeInput
                                        onComplete={() => {
                                            submitForm();
                                        }}
                                        onChange={(e) => {
                                            setcode(e);
                                        }}
                                        fields={6}
                                        placeholder={["0", "0", "0", "0", "0", "0"]}
                                        className="font-semibold verfiy-inputs"
                                        values={code?.split("")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pr-0 mt-5 flex flex-col gap-3">
                            <button type="submit" className="bg-blue-500  w-full text-white font-medium  py-3 rounded-[3px] text-sm hover:bg-blue-600 ">Verify 2fA Code</button>

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

