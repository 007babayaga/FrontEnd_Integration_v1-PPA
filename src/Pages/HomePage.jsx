
import { ToastContainer } from "react-toastify"
import { Footer } from "../Components/Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const HomePage = () => {
    const [productsCategory, setProductsCategory] = useState([])
    const navigate = useNavigate();

    const getProductsCategory = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/category/all`, {
                method: "GET",
                credentials: "include",
            })
            const res = await response.json()
            setProductsCategory(res.data.AllCategories || [])
        } catch (err) {
            console.log("Error in getting all Products", err.message)
        }
    }

    const HandleCategoryClick = (slug)=>{
        navigate(`/category/${slug}`)
    }

    useEffect(() => {
        getProductsCategory()
    }, [])

    

    return (
        <>
            <ToastContainer />
            <div className="grid grid-cols-[300px_1fr] min-h-screen p-3">
                {/* Left wala categories Section */}
                <div className=" flex flex-col gap-2 p-2.5 shadow-md rounded-lg bg-white ">
                <h2 className="text-xl font-bold text-gray-800 text-center">Categories</h2>
                    {
                        productsCategory.map((ele,idx)=>{
                            return(
                                <div
                                onClick={()=>{HandleCategoryClick(ele.slug)}}
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
                <div>
                    <p>Hello</p>
                </div>

            </div>
                <Footer />
        </>
    )
}

export { HomePage }
