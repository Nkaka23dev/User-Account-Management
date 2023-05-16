export default function UserInfo() {
  return (
    <section>
      <div className="grid">
        <div className="w-32 h-32 mx-auto relative ">
          <img className="rounded-full absolute z-10 w-full shadow-lg h-full object-cover" src="https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_960_720.jpg" alt="" />
          <img className="absolute bottom-[0.05rem] cursor-pointer -right-3" src="/vectors/camera.svg" alt="" />
        </div>
        <div className="mt-2 grid">
          <div className="flex items-center mx-auto">
            <p className="text-center text-md">Eric Nkaka</p>
            <img className="-mt-1" src="/vectors/badge.svg" />
          </div>
          <p className="text-center text-gray-400 text-sm">CEO of KK</p>
        </div>
        <button className=" my-16 duration-300 m-auto px-10 py-2 hover:border-gray-500  border border-gray-300 shadow-2xl rounded-md">Log out</button>
      </div>
    </section>
  )
}
