import { useNavigate, useParams } from "react-router"
import { Navbar } from "../Components/Navbar"
import { useEffect, useState } from "react";
import { Footer } from "../Components/Footer";
import { LoadingSkeleton } from "../Components/ui/loadingSkeleton";
import { Button } from "../Components/ui/Button";
import { successToast } from "../../utils/toastHelper";
import { useAuthContext } from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";


const ViewPage = () => {
    const { productId } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const navigate = useNavigate();


    const { isLoggedIn, AddToCart, RemoveFromCart,cart,addingProductToCart } = useAuthContext();

    const getProduct = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/view/${productId}`, {
                method: "GET",
                credentials: "include",
            })
            const result = await response.json();
            setProduct(result.data.product);
        }
        catch (err) {
            console.log("Error in get Single Product Api", err.message)
        }
        finally {
            setLoading(false);
        }
    }
    const HanldeAddToCart = async() => {
        if (isLoggedIn) {
            // Add to  art
            await AddToCart(productId)
            successToast("product  added to cart ")
        }
        else {
            // navigate to login page
            navigate(`/login?redirect=/view/${productId}`);
        }
    }
    const HandleRemoveFromCart = () => {
        if (isLoggedIn) {
            // Remove From Cart
            successToast("product Removed")
            RemoveFromCart(product)
        }
    }
    
    const currentItem = cart.find((ele)=>ele.product._id===productId);
    
    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <ToastContainer />
            {
                loading ?
                    <>
                        <div className="w-5xl m-auto">
                            <LoadingSkeleton className="h-60 w-52 " />
                        </div>
                    </>
                    :
                    <div className="min-h-screen bg-gray-50 py-10 px-6">
                        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
                            {/* Left: Images */}
                            <div className="flex-1 bg-gray-200 flex items-center justify-center p-6">
                                <div className="flex gap-3 overflow-x-auto h-[450px] rounded-lg">
                                    {product.images?.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={product.title}
                                            className="h-full object-cover rounded-xl shadow-md"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right: Product Info */}
                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {product.title}
                                    </h1>

                                    <p className="text-2xl font-semibold text-green-600 mb-2">
                                        ₹{product.price?.toLocaleString()}
                                    </p>

                                    <p className="text-gray-600 mb-6">
                                        <span className="font-medium">In Stock:</span>{" "}
                                        {product.quantity}
                                    </p>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                            Description
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            {product.description ||
                                                "No description available for this product. Please check back later."}
                                        </p>
                                    </div>
                                </div>
                                {
                                    addingProductToCart ? 
                                    <>
                                    <div className="flex justify-center">
                                    <ClipLoader/>
                                    </div>
                                    </>
                                    :
                                    <>
                                    <div>
                                    {
                                        currentItem ?
                                        <>
                                            <div className="bg-blue-500 p-3 flex gap-9 items-center rounded-md text-white w-fit font-bold">
                                                <button 
                                                onClick={HandleRemoveFromCart}
                                                className="text-2xl cursor-pointer ">
                                                -
                                                </button>
                                                <p className="font-bold text-2xl">{currentItem.cartQuantity}</p>
                                                <button
                                                onClick={HanldeAddToCart}
                                                className="text-2xl cursor-pointer">
                                                +
                                                </button>
                                            </div>
                                            </>
                                            :
                                            <>
                                            <Button onClick={HanldeAddToCart}>Add to Cart</Button>
                                            </>
                                    }
                                    </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
            }
            <Footer loading={loading} />
        </>
    )
}
export { ViewPage }