export default function Button({ text }: { text: string }) {
    return (
        <button className="px-4 py-2 text-white bg-[#2C8DE0] font-extrabold rounded-xl animate-bounce cursor-pointer     ">{text}</button>
    )
}