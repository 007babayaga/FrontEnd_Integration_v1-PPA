import { useState } from "react";
import { Button } from "../Components/ui/Button";
import { useAuthContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import { successToast } from "../../utils/toastHelper";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CartPage = () => {
    const { cart, handleCheckout,DeleteItemFromCart,updatingCartState,placingOrder} = useAuthContext();
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const HandleOrderClick = async() => {
        await handleCheckout(address);
    }

    const HanldeViewProduct = (productId)=>{
        navigate(`/view/${productId}`)
    }
    const HandleDeleteFromCart = async(cartItemId)=>{
        await DeleteItemFromCart(cartItemId)
        successToast("Item Deleted!")
    }

    // Calculate total
    const totalAmount = cart.reduce((total, item) => {
        return total + (item.product.price * item.cartQuantity);
    }, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <ToastContainer/>
            {/* Loader Overlay */}
            {placingOrder && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
                        <ClipLoader size={40} color="#3B82F6" />
                        <p className="text-lg font-semibold text-gray-700">Placing your order...</p>
                    </div>
                </div>
            )}

            <div className={`max-w-6xl mx-auto ${placingOrder ? 'blur-sm pointer-events-none' : ''}`}>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent mb-4">
                        Cart Items
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-md shadow-md border border-white/60 p-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Cart Items</h2>
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {cart.length} item{cart.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {cart.map((ele, idx) => (
                                    <div 
                                        className="flex items-center gap-6 bg-gradient-to-r from-white to-blue-50 rounded-md p-6 shadow-md border border-blue-100/50 hover:shadow-md cursor-pointer transition-all duration-300 group"
                                        key={idx}
                                    >
                                        <div className="relative">
                                            <img
                                            onClick={()=>{HanldeViewProduct(ele.product._id)}}
                                                className="w-28 h-28 object-cover rounded-xl "
                                                src={ele.product.images?.[0]}
                                                alt={ele.title}
                                            />
                                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                                                {ele.cartQuantity}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                            <h1 className="font-bold text-gray-800 text-xl mb-3 line-clamp-2">
                                                {ele.product.quantity<ele.cartQuantity&&<h1 className="text-red-500">Out Of Stock!</h1>}
                                                {ele.product.title}
                                            </h1> 
                                            {
                                                updatingCartState ?
                                                <div>
                                                    <ClipLoader/>
                                                </div>
                                                :
                                            <div
                                            onClick={()=>{HandleDeleteFromCart(ele._id)}}
                                            className=" p-1.5 bg-red-400 rounded-2xl text-gray-100">
                                                <MdDeleteForever size={20}/>
                                            </div>
                                            }
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-green-600 text-2xl">
                                                    ₹{ele.product.price?.toLocaleString()}
                                                </p>
                                                <p className="text-lg font-semibold text-blue-600">
                                                    Total: ₹{(ele.product.price * ele.cartQuantity)?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkout Section */}
                    <div className="space-y-6">
                        {/* Total Amount Card */}
                        <div className="bg-blue-400 rounded-md shadow-md p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100">Subtotal</span>
                                    <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100">Shipping</span>
                                    <span className="font-semibold">FREE</span>
                                </div>
                                <div className="border-t border-blue-400/50 pt-3 mt-2">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-bold">Total</span>
                                        <span className="font-bold text-2xl">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-md shadow-md border border-white/60 p-6">
                            <div className="mb-4">
                                <label className="text-gray-800 font-bold text-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    Shipping Address
                                </label>
                                <p className="text-gray-600 text-sm mt-1">Where should we deliver your order?</p>
                            </div>
                            <textarea 
                                className="w-full px-4 py-3 bg-white/90 rounded-md border border-blue-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                onChange={(e) => {setAddress(e.target.value)}}
                                required
                                rows="4"
                                placeholder="Enter your complete shipping address with PIN code..."
                                name="address"
                                value={address}
                            />
                        </div>

                        {/* Checkout Button */}
                        <Button
                            onClick={HandleOrderClick}
                            disabled={!address.trim() || cart.length === 0}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                Proceed to Checkout
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CartPage };
