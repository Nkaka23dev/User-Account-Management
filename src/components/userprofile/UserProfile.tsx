import { useState } from "react";
import UserProfileForm from "./UserProfileForm";
import UserInfo from "./UserInfoAndImage";
import VerifyAccount from "./VerifyAccount";
import ResetPassword from "./ResetPassword";

export default function UserProfile() {
    const [openTab, setOpenTab] = useState(0);
    return (
        <section className="">
            <div className='lg:hidden py-32 w-full bg-blue-500 bg' >
            </div>
            <div className='max-w-7xl px-4 mx-auto lg:grid-cols-1  grid grid-cols-3 lg:gap-0 gap-10 lg:-mt-0  -mt-24 '>
                <div className='bg-white border border-gray-300 p-5 shadow-xl'>
                    <UserInfo />
                </div>
                <div className='col-span-2 rounded-[3px] bg-white border border-gray-300 p-0 shadow-xl'>
                    <div>
                        <div className="">
                            <div className="flex flex-col py-5 max-w-5xl ">
                                <ul className="flex sm:flex-col border-b border-slate-400 px-5 gap-5 cursor-pointer items-center ">
                                    {
                                        ["Account information", "verify Account", "reset password"].map((e, i) => {
                                            return (
                                                <li>
                                                    <a
                                                        onClick={() => setOpenTab(i)}
                                                        className={`inline-block md:text-xs  text-sm py-3 pt-2 text-gray-600 bg-white rounded- font-medium capitalize ${openTab === i ? 'border-b-[3px] border-blue-500 font-semibold ' : ''}`}
                                                    >
                                                        <span>  {e}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                                <div className="p-5 w-full">
                                    <div className={openTab === 0 ? "block" : "hidden"}>
                                        <UserProfileForm />
                                    </div>
                                    <div className={openTab === 1 ? "block" : "hidden"}>
                                        <VerifyAccount />
                                    </div>
                                    <div className={openTab === 2 ? "block" : "hidden"}>
                                        <ResetPassword />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
