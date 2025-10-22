
import { ToastContainer } from "react-toastify"
import { Footer } from "../Components/Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import "react-toastify/dist/ReactToastify.css"

const HomePage = () => {
    const [productsCategory, setProductsCategory] = useState([])
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
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

    const getItems = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?limit=12`, {
                method: "GET",
                credentials: "include",
            })
            const res = await response.json();
            setItems(res.data.products);
        } catch (err) {
            console.log("Error in getting items", err.message)
        } finally {
            setIsLoading(false);
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
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Skeleton Loader Component
    const ProductSkeleton = () => (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse border border-gray-200">
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
    );

    const CategorySkeleton = () => (
        <div className="p-4 bg-white border border-gray-200 rounded-xl animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
    );

    return (
        <>
            <ToastContainer/>
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
                {/* Main Content Area */}
                <div className="flex-1 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Hero Welcome Section - Full Width */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-center text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative z-10">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
                                    Welcome to <span className="text-yellow-300">TrueBuy</span>
                                </h1>
                                <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">
                                    Your ultimate shopping destination with premium products, unbeatable prices, and exceptional service.
                                </p>
                                <button 
                                    onClick={() => window.scrollTo({ top: document.getElementById('products-section')?.offsetTop - 100, behavior: 'smooth' })}
                                    className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                                >
                                    🛍️ Start Shopping
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Categories Sidebar - Sticky */}
                            <div className="lg:w-80 flex-shrink-0">
                                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 sticky top-8">
                                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 pb-4 border-b-2 border-blue-100 flex items-center justify-center gap-3">
                                        <span></span> Categories
                                    </h2>
                                    <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto p-3 custom-scrollbar">
                                        {productsCategory.length === 0 ? (
                                            // Category Skeletons
                                            Array.from({ length: 8 }).map((_, idx) => (
                                                <CategorySkeleton key={idx} />
                                            ))
                                        ) : (
                                            productsCategory.map((ele, idx) => (
                                                <div
                                                    onClick={() => HandleCategoryClick(ele.slug)}
                                                    className="p-4 bg-gradient-to-r from-white to-blue-50 border-2 border-gray-100 rounded-md 
                                                                hover:shadow-xl hover:border-blue-400 hover:scale-[1.02] hover:from-blue-50 hover:to-blue-100
                                                                transition-all duration-300 flex items-center justify-between cursor-pointer group"
                                                    key={idx}
                                                >
                                                    <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                                                        {ele.name}
                                                    </span>
                                                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-lg">
                                                        →
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                {/* Hero Carousel Section */}
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64 md:h-80 lg:h-96 mb-8">
                                    <div className="relative h-full w-full">
                                        <img
                                            src={images[currentIndex]}
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
                                            <div className="p-8 md:p-12 text-white max-w-2xl">
                                                <h3 className="text-3xl md:text-4xl font-bold mb-4">Summer Collection 2024</h3>
                                                <p className="text-xl text-blue-200 mb-6">Discover the latest trends and exclusive deals</p>
                                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                                                    Shop Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Carousel Indicators */}
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
                                                    index === currentIndex 
                                                    ? 'bg-white scale-125' 
                                                    : 'bg-transparent hover:bg-white/50'
                                                }`}
                                                onClick={() => setCurrentIndex(index)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Featured Products Section */}
                                <div id="products-section" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                                            Featured Products
                                        </h2>
                                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                                            Handpicked items with amazing quality and great prices
                                        </p>
                                    </div>

                                    {/* Products Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                                        {isLoading ? (
                                            // Product Skeletons
                                            Array.from({ length: 6 }).map((_, idx) => (
                                                <ProductSkeleton key={idx} />
                                            ))
                                        ) : (
                                            items.map((ele, idx) => (
                                                <div
                                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border-2 border-gray-100 overflow-hidden group cursor-pointer"
                                                    key={idx}
                                                    onClick={() => HandleClickHome(ele._id)}
                                                >
                                                    <div className="p-6 flex flex-col h-full">
                                                        {/* Product Image */}
                                                        <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                                                            <img
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                src={ele.images[0]}
                                                                alt={ele.title}
                                                                onError={(e) => {
                                                                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image"
                                                                }}
                                                            />
                                                        </div>
                                                        
                                                        {/* Product Info */}
                                                        <div className="flex-1 flex flex-col">
                                                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 min-h-[3.5rem]">
                                                                {ele.title}
                                                            </h3>
                                                            
                                                            <div className="mt-auto">
                                                                {/* Price */}
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <span className="text-2xl font-bold text-green-600">
                                                                        ₹{ele.price?.toLocaleString()}
                                                                    </span>
                                                                    {ele.originalPrice && ele.originalPrice > ele.price && (
                                                                        <span className="text-sm text-gray-500 line-through bg-red-50 px-2 py-1 rounded">
                                                                            ₹{ele.originalPrice?.toLocaleString()}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Rating (if available) */}
                                                                {ele.rating && (
                                                                    <div className="flex items-center mb-4">
                                                                        <div className="flex text-yellow-400">
                                                                            {'★'.repeat(Math.floor(ele.rating))}
                                                                            {'☆'.repeat(5 - Math.floor(ele.rating))}
                                                                        </div>
                                                                        <span className="ml-2 text-sm text-gray-600">({ele.rating})</span>
                                                                    </div>
                                                                )}

                                                                {/* View Product Button */}
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        HandleClickHome(ele._id);
                                                                    }}
                                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                                                                >
                                                                    View Product
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    )
}

export { HomePage }