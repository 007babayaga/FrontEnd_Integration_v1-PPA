import { ToastContainer } from "react-toastify"
import { Footer } from "../Components/Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?limit=9`, {
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
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const ProductSkeleton = () => (
        <div className="bg-white rounded-lg p-4 animate-pulse border border-gray-100 shadow-sm">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
        </div>
    );

    const CategorySkeleton = () => (
        <div className="p-3 bg-white border border-gray-100 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded"></div>
        </div>
    );

    return (
        <>
            <ToastContainer />
            
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="flex-1 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {/* Hero - just better shadow */}
                        <div className="text-center mb-9 p-8 bg-cyan-50 rounded-lg shadow-sm border border-cyan-100">
                            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                                Welcome to <span className="font-semibold">TrueBuy</span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Thoughtfully curated products for everyday life. Quality you can trust.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Categories - just shadow */}
                            <div className="lg:w-64 flex-shrink-0">
                                <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm sticky top-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100">
                                        Categories
                                    </h2>
                                    <div className="space-y-2 max-h-[calc(100vh-150px)] overflow-y-auto cursor-pointer">
                                        {productsCategory.length === 0 ? (
                                            Array.from({ length: 8 }).map((_, idx) => (
                                                <CategorySkeleton key={idx} />
                                            ))
                                        ) : (
                                            productsCategory.map((ele, idx) => (
                                                <button
                                                    onClick={() => HandleCategoryClick(ele.slug)}
                                                    className="w-full text-left p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center justify-between group cursor-pointer"
                                                    key={idx}
                                                >
                                                    <span className="text-sm font-normal group-hover:font-medium">
                                                        {ele.name}
                                                    </span>
                                                    <span className="text-gray-400 group-hover:text-gray-600 transition-colors text-sm">
                                                        →
                                                    </span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                {/* Carousel - just shadow */}
                                <div className="relative overflow-hidden rounded-lg mb-8 bg-gray-50 shadow-md">
                                    <div className="relative h-64 md:h-80">
                                        <img
                                            src={images[currentIndex]}
                                            alt="Featured collection"
                                            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                                        />
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <h3 className="text-2xl md:text-3xl font-light mb-3">New Arrivals</h3>
                                                <p className="text-gray-200 text-sm md:text-base">Carefully selected for you</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    index === currentIndex 
                                                    ? 'bg-white' 
                                                    : 'bg-white/50'
                                                }`}
                                                onClick={() => setCurrentIndex(index)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div id="products-section" className="mb-12">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-light text-gray-900 mb-2">
                                            Featured Products
                                        </h2>
                                        <p className="text-gray-600 text-sm">
                                            Essentials you'll love
                                        </p>
                                    </div>

                                    {/* Products - just better shadow/hover */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {isLoading ? (
                                            Array.from({ length: 6 }).map((_, idx) => (
                                                <ProductSkeleton key={idx} />
                                            ))
                                        ) : (
                                            items.map((ele, idx) => (
                                                <div
                                                    className="bg-white border border-gray-100 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                                                    key={idx}
                                                    onClick={() => HandleClickHome(ele._id)}
                                                >
                                                    <div className="p-4">
                                                        <div className="w-full h-48 mb-4 overflow-hidden rounded bg-gray-50 flex items-center justify-center">
                                                            <img
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                src={ele.images[0]}
                                                                alt={ele.title}
                                                                onError={(e) => {
                                                                    e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                                                                }}
                                                            />
                                                        </div>
                                                        
                                                        <div className="space-y-3">
                                                            <h3 className="text-base font-normal text-gray-900 line-clamp-2 leading-relaxed">
                                                                {ele.title}
                                                            </h3>
                                                            
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <span className="text-lg font-medium text-gray-900">
                                                                        ₹{ele.price?.toLocaleString()}
                                                                    </span>
                                                                    {ele.originalPrice && ele.originalPrice > ele.price && (
                                                                        <span className="text-sm text-gray-500 line-through ml-2">
                                                                            ₹{ele.originalPrice?.toLocaleString()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                
                                                                {ele.rating && (
                                                                    <div className="flex items-center text-sm text-gray-600">
                                                                        <span className="text-yellow-400 mr-1">★</span>
                                                                        {ele.rating}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    HandleClickHome(ele._id);
                                                                }}
                                                                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 text-sm font-normal cursor-pointer"
                                                            >
                                                                View details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Value section - unchanged */}
                                <div className="bg-gray-50 rounded-lg p-8 mb-8 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                        <div className="space-y-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                                <span className="text-blue-600 text-lg">✓</span>
                                            </div>
                                            <h3 className="font-medium text-gray-900">Quality Assured</h3>
                                            <p className="text-sm text-gray-600">Every product carefully vetted</p>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                                <span className="text-green-600 text-lg">🚚</span>
                                            </div>
                                            <h3 className="font-medium text-gray-900">Fast Shipping</h3>
                                            <p className="text-sm text-gray-600">Free delivery on orders over ₹999</p>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                                <span className="text-purple-600 text-lg">💬</span>
                                            </div>
                                            <h3 className="font-medium text-gray-900">Support</h3>
                                            <p className="text-sm text-gray-600">We're here to help</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export { HomePage }