import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { FadeLoader } from "react-spinners";
import { Footer } from "../Components/Footer";

const CatergoryPage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const naviagte = useNavigate();

    const { slug } = useParams();
    const getPdtByCategory = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/category/${slug}`, {
                method: "GET",
                credentials: "include",
            })
            const res = await response.json();
            setProducts(res.data.categoryPdts);
        }
        catch (err) {
            console.log("Error in category Api", err.message)
        }
        finally {
            setLoading(false);
        }
    }
    const HandleClickFromCategory = (id)=>{
        naviagte(`/view/${id}`)
    }
    useEffect(() => {
        getPdtByCategory();
    }, [])
    console.log(products)

    return (
        <div>
            <p className="font-bold text-2xl text-center p-3">Category-Wise-Products</p>
            {
                loading ?
                    <div className="flex items-center justify-center h-screen">
                        <FadeLoader />
                    </div>
                    :
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2.5">
                            {
                                products.map((ele, idx) => (
                                    <div
                                        className="p-4 bg-gray-100  rounded-md cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
                                        key={idx}
                                    >
                                        <img
                                            className="h-24 w-24 object-cover rounded-md mb-3"
                                            src={ele.images[0]}
                                            alt={ele.title}
                                        />
                                        <p className="text-lg font-semibold text-gray-800 text-center mb-2">
                                            {ele.title}
                                        </p>
                                        <p className="text-xl font-bold text-green-600 mb-1">
                                            ₹{ele.price?.toLocaleString()}
                                        </p>
                                        <button
                                        onClick={()=>{HandleClickFromCategory(ele._id)}}
                                        className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                                        >
                                        BuyNow
                                        </button>
                                    </div>
                                ))
                            }
                        </div>

                    </>
            }
            <Footer />
        </div>
    )
}
export { CatergoryPage }