import type { Product } from "../types/product"

export default function ProductCard({ image_url, name, sale_price, price }: Product) {
    return (
        /* */
        <div className="w-full max-w-60 h-80 border-2 border-neutral-400 rounded-3xl p-4 flex flex-col items-start justify-between gap-2 bg-white mx-auto transition-all hover:shadow-md">

            {/* */}
            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                {image_url ? (
                    <img loading="lazy" className="object-cover w-full h-full" src={image_url} alt={name} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs">No Image</div>
                )}
            </div>

            {/*  */}
            <div className="w-full flex-1 flex flex-col justify-center">
                <p className="font-extrabold text-sm md:text-base line-clamp-2 leading-tight">
                    {name}
                </p>
                <p className="text-[#2C8DE0] font-extrabold text-base md:text-lg mt-1">
                    {sale_price ? sale_price.toLocaleString() : price.toLocaleString()}₫
                </p>
            </div>

            {/*  */}
            <button className="bg-[#2C8DE0] text-white font-extrabold p-2 px-6 rounded-xl hover:bg-[#1a6fb8] transition-colors w-full md:w-auto text-sm">
                Mua
            </button>
        </div>
    )
};