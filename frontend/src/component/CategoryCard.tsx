import type { Category } from "../types/category";

export default function ProductCard({ name, slug, image_url }: Category) {
    return (
        <div className="w-full max-w-60 h-85 md:h-80 border-2 border-neutral-400 rounded-3xl p-4 flex flex-col items-start justify-between gap-3 bg-white mx-auto">
            {/*  */}
            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                {image_url ? (
                    <img loading="lazy" className="object-cover w-full h-full" src={image_url} alt={name} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
            </div>
            {/*  */}
            <div className="w-full flex-1 min-h-0">
                <p className="font-extrabold text-sm md:text-base line-clamp-1">{name}</p>
                <p className="text-xs md:text-sm text-gray-600 truncate">{slug}</p>
            </div>

            <button className="bg-[#2C8DE0] font-extrabold text-white p-2 px-6 rounded-xl hover:bg-blue-600 transition-colors w-full md:w-auto text-sm md:text-base">
                Chi tiết
            </button>
        </div>
    )
};