import { Outlet } from "react-router";
import { Navbar } from "../Components/Navbar";
import { useAuthContext } from "../context/AppContext";


const BasicLayout = () => {
    const { cart, AddToCart, RemoveFromCart } = useAuthContext();

    const isCartEmpty = cart.length === 0;
    console.log(cart)

    return (
        <>
            <div className={`grid ${isCartEmpty ? "grid-cols-1" : "grid-cols-[1fr_170px]"}`}>
                <div>
                    <Navbar />
                    <Outlet />
                </div>
                {
                    !isCartEmpty && (
                        <div className="bg-blue-200 flex flex-col p-1 
                        h-screen overflow-y-auto sticky top-0">
                            {
                            cart.map((ele, idx) => (
                                <div
                                    key={idx}
                                    className=" p-3 flex flex-col items-center justify-center 
                                    border border-gray-200 rounded-xl shadow-sm 
                                    mb-3 hover:shadow-md hover:border-blue-400 
                                    transition"
                                >
                                    <img
                                        className="bg-gray-100 rounded-md"
                                        src={ele.product.images?.[0]}
                                        alt={ele.title}
                                    />

                                    <div className="flex gap-1">
                                        <h1 className="font-bold text-gray-900 overflow-x-hidden">
                                            {ele.product.title}
                                        </h1>
                                        <p className="font-semibold text-green-600 ">
                                            ₹{ele.product.price?.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-6 px-4 py-0.5 rounded-md mt-2 
                                    cursor-pointer bg-blue-500 text-white items-center">
                                        <button
                                            onClick={() => {RemoveFromCart(ele)}}
                                            className="text-[20px] cursor-pointer"
                                        >
                                        -
                                        </button>
                                        <p className="font-bold">{ele.cartQuantity}</p>
                                        <button
                                            onClick={() => {AddToCart(ele.product._id);}}
                                            className="text-[20px] cursor-pointer"
                                        >
                                        +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }

            </div>
        </>
    )
}
export { BasicLayout }