import { useState } from "react";
import { Footer } from "../Components/Footer";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MoonLoader } from "react-spinners";
import { erorrToast, successToast } from "../../utils/toastHelper";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../context/AppContext";
import { ToastContainer } from "react-toastify";

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
                erorrToast(res.message)
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
                <form className="flex flex-col items-center justify-center p-8 gap-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 mb-7 transition-all hover:scale-[1.01]" onSubmit={HandleSubmit}>
                    <h2 className="text-2xl font-bold text-blue-800 mb-7">Login</h2>
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
                            className="absolute right-3 top-3/5 -translate-y-1/5 -translate-3 cursor-pointer text-black"
                            onClick={() => setshowPassword(!showPassword)}
                        >
                            {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                        </span>
                    </div>
                    <button
                        className="px-4 py-2 w-90 tracking-wider mt-6 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >Login
                    </button>
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