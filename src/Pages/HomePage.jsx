
import { ToastContainer } from "react-toastify"
import { Footer } from "../Components/Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


const HomePage = () => {
    const [productsCategory, setProductsCategory] = useState([])
    const[items,setItems] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const getProductsCategory = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/category/all`, {
                method: "GET",
                credentials: "include",
            })
            const res = await response.json()
            setProductsCategory(res.data.AllCategories)
        } catch (err) {
            console.log("Error in getting all Products", err.message)
        }
    }
    const getItems =  async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?limit=12`, {
                method: "GET",
                credentials: "include",
            })
            const res = await response.json();
            console.log(res);
            setItems(res.data.products);
        } catch (err) {
            console.log("Error in getting items", err.message)
        }
    }

    const HandleCategoryClick = (slug) => {
        navigate(`/category/${slug}`)
    }
     const HandleClickHome = (productId) => {
        navigate(`/view/${productId}`)
    }


    useEffect(() => {
        getProductsCategory();
        getItems();
    }, [])
    
    const images = [
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
        "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-screen p-3 gap-3">
                {/* Left wala categories Section */}
                <div className=" flex flex-col gap-2 p-2.5 shadow-md rounded-lg bg-blue-50 ">
                    <h2 className="text-xl font-bold text-gray-800 text-center">Categories</h2>
                    {
                        productsCategory.map((ele, idx) => {
                            return (
                                <div
                                    onClick={() => { HandleCategoryClick(ele.slug) }}
                                    className="p-4 bg-gray-200 border border-gray-200 rounded-xl shadow-sm 
                                    hover:shadow-md hover:border-blue-500 hover:scale-105 
                                    transition-all duration-300 flex items-center justify-center cursor-pointer"
                                    key={idx}>
                                    <p>{ele.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Right wala I will make it soon */}
                <div className="flex flex-col gap-4 items-center ml-2">
                    {/* Pehele wala */}
                    <div className="  w-full p-2 bg-cyan-100 rounded-2xl shadow-md  text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
                            Welcome to  TrueBuy!
                        </h2>
                    </div>
                    {/* Duesre wala */}
                    <div className="w-full relative overflow-hidden rounded-2xl ">
                        <div className="relative h-64 md:h-80 w-full">
                            <img
                                src={images[currentIndex]}
                                alt="Hero Banner"
                                className="w-full h-80 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                <h2 className="text-white text-3xl md:text-4xl font-bold">
                                    Discover Amazing Deals!
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* tesra wala */}
                    <div className="  w-full p-2 bg-cyan-100 rounded-2xl shadow-md border border-purple-100 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
                            Explore Here!!
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-17 p-2.5">
                            {
                                items.map((ele, idx) => (
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
                                        onClick={()=>{HandleClickHome(ele._id)}}
                                        className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                                        >
                                        View Product
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export { HomePage }
