import { forwardRef } from "react"

function Select({ data, label, error, ...other }: any, ref: any) {
    return (
        <div className="mb-2">
            <label className="text-sm mb-[6px] capitalize block text-gray-600 font-medium" htmlFor="">{label}</label>
            <select ref={ref} {...other} data-te-select-init className={`py-3 text-[13px] font-medium text-slate-600 rounded-[3px] w-full px-3 border  outline-none ${error ? 'border-red-500' : 'border-gray-300'} `}>
                <option value="">Choose</option>
                {data.map((value: any, index: number) => {
                    return (
                        <option key={index} value={value}>{value}</option>
                    )
                })}
            </select>
            {error && <span className='text-red-500 text-[12px] capitalize font-medium'>*{error.message}</span>}
        </div>
    )
}

export default forwardRef(Select)