import { forwardRef } from 'react'

interface InputProps {
    label: string,
    placeholder: string,
    type?: string,
    error?: any
}
function Input({ label, placeholder, type, error, ...other }: InputProps, ref: any) {
    const inputId = label.toLowerCase().replace(/\s/g, '-');
    return (
        <div className="w-full mb-3">
            <label  className="text-sm mb-[6px] capitalize block text-gray-600 font-medium "
             htmlFor={inputId}>{label} <span className='text-red-500'>*</span> </label>
            <input id={inputId} ref={ref} {...other} type={type || 'text'} placeholder={placeholder} className={`py-3 text-[13px] font-medium text-slate-600 rounded-[3px] w-full px-3 border  outline-none ${error ? 'border-red-500' : 'border-gray-300'}`} />
            {error && <span className='text-red-500 text-[12px] capitalize font-medium'>*{error.message}</span>}
        </div>
    )
}

export default forwardRef(Input)