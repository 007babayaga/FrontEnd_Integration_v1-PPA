import { useState } from "react";
import { Footer } from "../Components/Footer";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MoonLoader } from "react-spinners";
import { errorToast, successToast } from "../../utils/toastHelper";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import GoogleLogo from "../Assets/Google Logo.jpg";

const LoginPage = () => {
    const { handleSetUser } = useAuthContext();
    const [showPassword, setshowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/";

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const email = e.target.email.value;
            const password = e.target.password.value;
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const res = await response.json();
            if (response.status === 200) {
                successToast("Login Success")
                handleSetUser({
                    isLoggedIn: true,
                });

                navigate(redirectUrl, { replace: true });
            }
            else {
                errorToast(res.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>
            <div className={`flex pt-3 justify-center bg-gray-100 min-h-screen ${loading ? 'blur-sm' : ''} transition-all duration-300`}>
                <ToastContainer />
                <form className="flex flex-col items-center justify-center p-8 gap-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 mb-7 transition-all hover:scale-[1.01]"
                    onSubmit={HandleSubmit}>
                    <h2 className="text-2xl font-bold text-black mb-7">Login</h2>
                    <div className="flex flex-col p-3 gap-2 w-full">
                        <label className="text-blue-700 font-bold">
                            Enter Your Email
                        </label>
                        <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full read-only:cursor-not-allowed"
                            type="email"
                            required
                            placeholder="Enter Your Email"
                            name="email" />
                    </div>

                    <div className="flex flex-col p-3 gap-2 w-full relative">
                        <label className="text-blue-700 font-bold">
                            Enter Your Password
                        </label>
                        <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter Your Password"
                            name="password" />
                        <span
                            className="absolute pt-1 right-3 top-3/7 -translate-y-1/5 -translate-3 cursor-pointer text-black"
                            onClick={() => setshowPassword(!showPassword)}
                        >
                            {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                        </span>

                        <Link className=" w-full tracking-wider flex justify-end" to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        {/* Login Button */}
                        <button
                            className="px-4 py-2 w-full bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
                            type="submit"
                            disabled={loading}
                        >
                            Login
                        </button>

                        {/* OR Separator */}
                        <div className="relative w-full flex justify-center items-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <span className="relative bg-white px-3 text-sm font-bold text-gray-600">
                                OR
                            </span>
                        </div>

                        {/* Google Login Button */}
                        <div className="w-full border border-blue-300 flex justify-center items-center rounded-md px-4 py-2 hover:cursor-pointer transition-all hover:scale-105 duration-300">
                            <div className="flex justify-center items-center gap-3">
                                <img className="h-6 sm:h-7" src={GoogleLogo} alt="Sign in with Google" />
                                <p className="text-sm sm:text-base font-medium text-gray-700">
                                    Login With Google
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link className="font-bold w-full tracking-wider" to="/signUp">Don't have an Account? <span className="text-blue-700 text-decoration: underline">SignUp Here</span></Link>
                    </div>
                </form>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
                        <MoonLoader size={40} color="#1e40af" />
                        <p className="text-blue-800 font-semibold">Logging you in...</p>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}
export { LoginPage }