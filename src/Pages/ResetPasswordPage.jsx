import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { Link, useParams, useNavigate } from "react-router";
import { errorToast, successToast } from "../../utils/toastHelper";
import { ToastContainer } from "react-toastify";

const ResetPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    // Validate token when component mounts
    useEffect(() => {
        validateToken();
    }, [token]);

    const validateToken = async () => {
        try {
            setValidating(true);
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/resetPassword/validate/${token}`
            );
            
            const res = await response.json();
            
            if (response.status===200) {
                setTokenValid(true);
                setUserEmail(res.email || "");
                successToast("Reset link is valid. You can now set your new password.");
            } else {
                setTokenValid(false);
                errorToast(res.message);
            }
        } catch (err) {
            console.error("Token validation error:", err);
            setTokenValid(false);
            errorToast("Failed to validate reset link. Please try again.");
        } finally {
            setValidating(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const formData = new FormData(e.target);
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");

            // Frontend validation
            if (!password || !confirmPassword) {
                errorToast("Please fill in all fields");
                return;
            }

            if (password.length < 6) {
                errorToast("Password must be at least 6 characters long");
                return;
            }

            if (password !== confirmPassword) {
                errorToast("Passwords do not match");
                return;
            }

            // Send reset request
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/resetPassword/${token}`,
                {
                    method: "POST",
                    body: JSON.stringify({ password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            
            const res = await response.json();
            
            if (response.status===200) {
                successToast("Password reset successfully! Redirecting to login...");
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 2000);
                
            } else {
                errorToast(res.message);
            }
        } catch (err) {
            console.error("Reset password error:", err);
            errorToast("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Show loading while validating token
    if (validating) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
                    <MoonLoader size={40} color="#1e40af" />
                    <p className="text-blue-800 font-semibold">Validating reset link...</p>
                </div>
            </div>
        );
    }

    // Show error if token is invalid
    if (!tokenValid) {
        return (
            <div className="flex justify-center  items-center min-h-screen bg-gray-100">
                <ToastContainer />
                <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
                    <div className="text-red-600 text-lg font-semibold mb-4">
                        ❌ Invalid Reset Link
                    </div>
                    <p className="text-gray-600 mb-6">
                        This password reset link is invalid or has expired. 
                        Please request a new reset link.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link 
                            to="/forgot-password" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                        >
                            Request New Reset Link
                        </Link>
                        <Link 
                            to="/login" 
                            className="px-4 py-2 text-blue-600 hover:underline font-medium"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Show reset password form
    return (
        <div  className="flex pt-3 justify-center bg-gray-100 min-h-screen relative ">
            <ToastContainer />
            <div  className={`${loading ? "blur-sm" : " w-full max-w-md mx-4 mb-7"} transition-all`}>
            <form 
                className="flex flex-col items-center justify-center p-8 gap-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 my-7"
                onSubmit={handleSubmit}
            >
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-black mb-2">Reset Your Password</h2>
                    {userEmail && (
                        <p className="text-gray-600 text-sm">For: <span className="font-medium">{userEmail}</span></p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">Enter your new password below</p>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-blue-700 font-bold">New Password</label>
                    <input 
                        id="password"
                        className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full "
                        type="password"
                        required
                        placeholder="Enter new password"
                        name="password"
                        minLength="6"
                        disabled={loading}
                    />
                    <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="confirmPassword" className="text-blue-700 font-bold">Confirm Password</label>
                    <input 
                        id="confirmPassword"
                        className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full "
                        type="password"
                        required
                        placeholder="Confirm new password"
                        name="confirmPassword"
                        minLength="6"
                        disabled={loading}
                    />
                </div>

                <button
                    className="px-4 py-2 w-full tracking-wider bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Resetting Password..." : "Reset Password"}
                </button>
                
                <div className="mt-4 text-center">
                    <Link 
                        className="font-bold text-blue-700 hover:underline" 
                        to="/login"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </form>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
                        <MoonLoader size={40} color="#1e40af" />
                        <p className="text-blue-800 font-semibold">Resetting password...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export  {ResetPasswordPage};