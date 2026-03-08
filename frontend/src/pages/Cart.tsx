import { useCartStore } from "../store/cartStore";
import { HiOutlineX } from "react-icons/hi";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { useAuthStore } from "../store/authStore";

export default function Cart() {
    const { isAuth } = useAuthStore();
    const { items, increaseQty, decreaseQty, removeItem, getTotal } = useCartStore();
    //
    if (!isAuth) {
        return <div className="p-4">
            <p>Bạn chưa đăng nhập</p>
            <Link
                className=" text-blue-500"
                to="/login">Đăng nhập Ngay</Link>
        </div>;
    }
    //
    if (items.length === 0)
        return <div className="p-4">Giỏ hàng trống</div>;

    return (
        <div className="container mx-auto ">
            <Header />

            <div className=" container mx-auto max-w-4xl">
                <div className=" flex flex-col justify-center items-center">
                    <div className="text-center  mt-2 text-2xl font-extrabold p-2 bg-amber-500 ">Chúng tôi biết bạn có nhiều lựa chọn, cám ơn bạn đã chọn sản phẩm của chúng tôi</div>
                    <h1 className="text-2xl  text-center font-bold mb-4">Giỏ hàng</h1>
                    <p className="  text-center mb-4 p-2 border-b-5 ">Giỏ hàng có {items.length} sản phẩm</p>
                </div>

                <div className="flex flex-col  justify-center">
                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="border rounded-2xl p-4 mb-2 flex justify-between "
                        >
                            <div className="">
                                <div className="w-20 h-20 rounded-xl">{item.image_url ? (<img className="object-cover rounded-xl w-full h-full" src={item.image_url} />) : null}</div>
                            </div>
                            <div className="justify-center flex flex-col items-center">
                                <div className="font-semibold text-lg">{item.name}</div>
                                <div>{item.price}đ</div>
                                <div className=" border-2  border-gray-600 flex justify-around items-center">
                                    <button
                                        className=" px-1 cursor-pointer "
                                        onClick={() => decreaseQty(item.productId)}>
                                        -
                                    </button>
                                    <span className=" bg-gray-500 border-x-2 border-gray-600  px-3  ">{item.qty}</span>
                                    <button
                                        className="px-1 cursor-pointer "
                                        onClick={() => increaseQty(item.productId)}>
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="   cursor-pointer"
                                >
                                    <HiOutlineX size={25} />


                                </button>
                                <p>
                                    {item.price * item.qty}đ
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="text-right my-4  text-xl font-bold">
                        Tổng: {getTotal()}đ
                    </div>
                    <div className="flex gap-4 ">
                        <Link to="/checkout"
                            className="w-full ">
                            <button
                                className="bg-[#2C8DE0] hover:text-[#2C8DE0] ease-in-out duration-500    border-2  hover:bg-white  rounded-lg text-white w-full py-4">Tiếp tục mua hàng</button>
                        </Link>
                        <Link to="/"
                            className="w-full ">
                            <button
                                className="bg-[#2C8DE0] hover:text-[#2C8DE0] ease-in-out duration-500    border-2  hover:bg-white  rounded-lg text-white w-full py-4">Tiếp tục mua hàng</button>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    );
}