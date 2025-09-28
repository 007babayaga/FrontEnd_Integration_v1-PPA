import { useAuthContext } from "../../context/AppContext";
import { ClipLoader } from "react-spinners";
import { Button } from "./Button";
import { useNavigate } from "react-router";

const CartSidebar = ()=>{
    const { cart, AddToCart, RemoveFromCart,updatingCartState,handleCheckout } = useAuthContext();
    const navigate = useNavigate();

    const HandleViewProduct = (productId)=>{
        navigate(`/view/${productId}`);
    }

    return(
        <>
        <div className="bg-blue-200 flex flex-col p-1 
                        h-screen overflow-y-auto sticky top-0">
                            {
                            cart.map((ele, idx) => (
                                <div
                                    onClick={()=>{HandleViewProduct(ele.product._id)}}
                                    key={idx}
                                    className=" p-3 flex flex-col items-center justify-center 
                                    border border-gray-200 rounded-xl shadow-sm 
                                    mb-3 hover:shadow-md hover:border-blue-400 
                                    transition  cursor-pointer"
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

                                    <div className="flex gap-6 px-1 py-1 rounded-md mt-2 items-center bg-gray-200">
                                        <Button
                                            disabled={updatingCartState}
                                            variant='outline-primary'
                                            onClick={() => {RemoveFromCart(ele.product._id)}}
                                            className="text-[20px] cursor-pointer"
                                        >
                                        -
                                        </Button>
                                        <div className="flex justify-center items-center w-6">
                                            {updatingCartState ? (
                                                <ClipLoader size={20} />
                                            ) : (
                                                <p className="font-bold">{ele.cartQuantity}</p>
                                            )}
                                        </div>
                                        <Button
                                            disabled={updatingCartState}
                                            variant='outline-primary'
                                            onClick={() => {AddToCart(ele.product._id)}}
                                            className="text-[20px] cursor-pointer"
                                        >
                                        +
                                        </Button>
                                    </div>

                                </div>
                            ))}
                            <div className="flex justify-center m-6">
                                <Button 
                                onClick={handleCheckout}
                                className="px-3 py-2 bg-red-500 hover:bg-red-600">
                                CheckOut
                                </Button>
                            </div>
                        </div>
        </>
    )
}
export{CartSidebar}