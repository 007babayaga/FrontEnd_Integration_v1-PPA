
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate, useSearchParams,useLocation } from "react-router";
import { IoLogInOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FiMenu, FiX } from "react-icons/fi";
import {  useEffect, useState } from "react";
import {  useAuthContext } from "../context/AppContext";
import { UserIcon } from "lucide-react";
import { UserInfo } from "./UserInfo";



const Navbar = () => {
    const location = useLocation();
    const hideNavItems = ["/login", "/signUp"].includes(location.pathname);


    const [query] = useSearchParams();
    const defaultSearchValue = query.get("text");
    const[searchText,setSearchtext] = useState(defaultSearchValue || " ");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate= useNavigate();

    const {isLoggedIn,HandleLogout,cart} = useAuthContext()
    
    const totalCartItems = cart.length;

    const handleSearchClick = ()=>{
        navigate(`/search?text=${searchText}`)
    }

    return (
    <nav className="bg-gradient-to-b from-blue-600 via-sky-500 to-cyan-400 backdrop-blur-md sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">

            <div className="text-3xl font-extrabold text-white tracking-wide">
            <Link to="/">TrueBuy</Link>
            </div>
            {
                !hideNavItems &&(<div className="hidden md:flex gap-2">
            <input
                className="px-4 py-2 bg-white/90 rounded-md w-80 shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                placeholder="Search for products..."
                value={searchText}
                onChange={(e)=>{setSearchtext(e.target.value)}}
            />
            <button onClick={handleSearchClick} className="px-5 py-2 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                Search
            </button>
            </div>)
            }
                <div className="hidden md:flex gap-10 items-center text-sm font-medium text-white">
                    {
                        isLoggedIn ?
                        <>
                        <div>
                        <UserInfo/>
                        </div>
                        <div className="flex gap-2 ">
                        <Link to="/cart"className=" hover:text-blue-600  transition-all duration-300 hover:scale-105 ">
                        Cart
                        <FiShoppingCart className="text-2xl mb-1" />
                        </Link>
                        <p className="rounded-2xl bg-red-400 h-6 px-2">{totalCartItems}</p>
                        </div>
                        </>
                        :
                        <>
                        <Link to="/login" className="flex flex-col items-center hover:text-blue-600  transition-all duration-300 hover:scale-105 ">
                        <IoLogInOutline className="text-2xl mb-1" />
                        Login
                        </Link>
                        <Link to="/signUp" className="flex flex-col items-center hover:text-blue-600  transition-all duration-300 hover:scale-105">
                        <MdAccountCircle className="text-2xl mb-1" />
                        SignUp
                        </Link>
                        </>
                    }
            </div>

            {/* For Small screens */}
            <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}className="text-white text-3xl focus:outline-none">
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>
            </div>

        </div>
        </div>

      {/* Mobile Dropdown */}
        {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md  px-6 py-4 space-y-5 text-gray-800   ">
          {/* Mobile Search */}

            {
            !hideNavItems &&(<>
            <input
            className="px-4 py-2 bg-gray-100 rounded-md w-full shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search for products..."
            value={searchText}
            onChange={(e)=>{setSearchtext(e.target.value)}}
            />
            <button onClick={handleSearchClick} className="w-full px-4 py-2 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 transition-all duration-300 cursor-pointer">
            Search
            </button>
            </>)
            }
            

          {/* Mobile Links */}
            {
                isLoggedIn?
                <>
                <div className="w-full flex justify-center">
                <UserInfo />
                </div>
                <Link to="/cart" className="flex flex-col  font-bold items-center hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Cart
                <div className="flex gap-2">
                <FiShoppingCart className="text-2xl mb-1" />
                <p className="rounded-2xl bg-red-400 h-6 px-2 text-white">{totalCartItems}</p>
                </div>
                </Link>
                </>
                :
                <>
                <div className="flex justify-around pt-3 text-sm font-medium">
                <Link to="/signUp" className="flex flex-col items-center hover:text-blue-600  transition-all duration-300 hover:scale-105">
                <MdAccountCircle className="text-2xl mb-1" />
                SignUp
                </Link>

                <Link to="/login" className="flex flex-col items-center hover:text-blue-600 transition-all duration-300 hover:scale-105">
                <IoLogInOutline className="text-2xl mb-1" />
                Login
                </Link>
            </div>
                </>
            }
        </div>
        )}
    </nav>
    );
};

export { Navbar };
