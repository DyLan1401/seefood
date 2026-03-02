type Product = {
    image_url: string | null
    name: string
    sale_price: number | null
    price: number
}
export default function ProductCard({ image_url, name, sale_price, price }: Product) {
    return (
        <div className="w-60 h-80  border-2 border-neutral-400   rounded-3xl  p-4 flex flex-col items-start justify-center gap-3 ">
            <div className="w-50 h-37.5 rounded-2xl">{image_url ? (<img className="object-cover w-full h-full" src={image_url} />) : null}</div>
            <div className="">
                <p className="font-extrabold">{name}</p>
                <p className="text-[#2C8DE0] font-extrabold">{sale_price ? sale_price : price}₫</p>
            </div>
            <button className="bg-[#2C8DE0]  text-white font-extrabold p-2 px-6 rounded-xl 0 transition-colors">Mua</button>
        </div>
    )
};