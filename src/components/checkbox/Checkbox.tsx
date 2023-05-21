export default function Checkbox({ label }: any) {
    return (
        <div className="relative flex items-start">
            <div className="flex items-center h-5">
                <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-[13px] text-gray-500">
                    {label}
                </label>
            </div>
        </div>
    )
}
