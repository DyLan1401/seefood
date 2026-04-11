import Banner1 from "../assets/banner1.jfif";
import Banner2 from "../assets/Banner2.jpg";
import Banner3 from "../assets/banner3.jpg";

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
                        <img src={Banner2} alt="Banner phụ 1" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 bg-amber-600 rounded-xl overflow-hidden aspect-video md:aspect-auto">
                        <img src={Banner3} alt="Banner phụ 2" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>

        </div>
    );
}