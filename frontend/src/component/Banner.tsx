import Banner1 from "../assets/banner1.jfif";

export default function Banner() {
    return (
        <div className="w-full max-w-7xl mx-auto p-2 flex flex-col gap-2">
            {/*  */}
            <div className="flex flex-col md:flex-row gap-2">

                {/* */}
                <div className="w-full md:w-2/3 aspect-video md:aspect-auto bg-green-500 rounded-xl overflow-hidden">
                    <img
                        src={Banner1}
                        alt="Banner chính"
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/*  */}
                <div className="flex flex-row md:flex-col w-full md:w-1/3 gap-2">
                    <div className="flex-1 bg-amber-600 rounded-xl overflow-hidden aspect-video md:aspect-auto">
                        <img src={Banner1} alt="Banner phụ 1" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 bg-amber-600 rounded-xl overflow-hidden aspect-video md:aspect-auto">
                        <img src={Banner1} alt="Banner phụ 2" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                <div className="h-24 md:h-32 hidden md:flex bg-amber-600 rounded-xl overflow-hidden">
                    <img src={Banner1} alt="Banner dưới 1" className="object-cover w-full h-full" />
                </div>
                <div className="h-24 md:h-32 bg-amber-600 rounded-xl hidden md:flex overflow-hidden">
                    <img src={Banner1} alt="Banner dưới 2" className="object-cover w-full h-full" />
                </div>
            </div>
        </div>
    );
}