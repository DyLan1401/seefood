export type Category = {
    name: string;
    slug: string;
    image_url: string | null;
}
export default function ProductCard({ name, slug, image_url }: Category) {
    return (
        /* 1. Thay w-60 bằng w-full để nó tự co giãn theo grid bên ngoài, giới hạn max-w để không quá to */
        <div className="w-full max-w-[240px] h-[340px] md:h-80 border-2 border-neutral-400 rounded-3xl p-4 flex flex-col items-start justify-between gap-3 bg-white mx-auto">

            {/* 2. Phần ảnh: Sử dụng aspect-video hoặc tỉ lệ cố định để ảnh không bị bẹp trên các màn hình khác nhau */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                {image_url ? (
                    <img className="object-cover w-full h-full" src={image_url} alt={name} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
            </div>

            {/* 3. Nội dung: Dùng truncate để tránh tên quá dài làm vỡ layout */}
            <div className="w-full flex-1 min-h-0">
                <p className="font-extrabold text-sm md:text-base line-clamp-1">{name}</p>
                <p className="text-xs md:text-sm text-gray-600 truncate">{slug}</p>
            </div>

            {/* 4. Nút bấm: p-2 px-6 có thể hơi to trên mobile nhỏ, ta giữ nguyên nhưng bọc trong w-full nếu muốn */}
            <button className="bg-[#2C8DE0] font-extrabold text-white p-2 px-6 rounded-xl hover:bg-blue-600 transition-colors w-full md:w-auto text-sm md:text-base">
                Chi tiết
            </button>
        </div>
    )
};