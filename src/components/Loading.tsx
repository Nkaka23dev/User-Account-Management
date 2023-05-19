export default function Loading({ invert }: { invert?: boolean }) {
    return (
        <div className={`flex  space-x-2 items-center ${invert ? "justify-start" : "justify-center"}`}>
            <img className={`animate-spin ${invert && "invert"}`} width={20} height={20} src="/vectors/loader.svg" alt="" /> <p className={invert && "text-black text-sm"}>Loading..</p>
        </div>
    )
}
