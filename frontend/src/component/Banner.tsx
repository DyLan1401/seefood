import Banner1 from "../assets/banner1.jfif"
export default function Banner() {
    return (
        <div className="w-full h-full flex flex-col mx-auto p-2">
            <div className="flex gap-2">
                <div className="bg-green-500 w-2/3 h-full rounded-xl flex justify-center items-center">
                    <img src={Banner1}
                        alt="Banner"
                        className="object-cover w-full h-full rounded-2xl" />
                </div>
                <div className="flex flex-col w-1/3 h-full  gap-2">
                    <div className="w-full h-full bg-amber-600 justify-center items-center flex rounded-xl">
                        <img src={Banner1}
                            alt="Banner"
                            className="object-cover w-full h-full rounded-2xl" /></div>
                    <div className="w-full h-full bg-amber-600 justify-center items-center flex rounded-xl">

                        <img src={Banner1}
                            alt="Banner"
                            className="object-cover w-full h-full rounded-2xl" /></div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
                <div className="w-full h-24 bg-amber-600 justify-center items-center flex rounded-xl">
                    <img src={Banner1}
                        alt="Banner"
                        className="object-cover w-full h-full rounded-2xl" /></div>
                <div className="w-full h-24 bg-amber-600 justify-center items-center flex rounded-xl">
                    <img src={Banner1}
                        alt="Banner"
                        className="object-cover w-full h-full rounded-2xl" /></div>
            </div>
        </div>
    )
}