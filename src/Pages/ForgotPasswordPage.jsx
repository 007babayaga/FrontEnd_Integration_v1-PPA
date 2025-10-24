import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router";
import { errorToast, successToast } from "../../utils/toastHelper";
import { ToastContainer } from "react-toastify";

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const email = e.target.email.value;

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/resetPassword`, {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            if (response.status === 200) {
                successToast("Reset Link has been sent to the Email!");
                setEmailSent(true);
            } else {
                errorToast(res.message || "Something went wrong");
            }
        } catch (err) {
            console.error("Password reset error:", err);
            errorToast("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex pt-3 justify-center bg-gray-100 min-h-screen transition-all duration-300">
            <ToastContainer />

            <form
                className={`flex flex-col items-center justify-center p-8 gap-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 mb-7 ${loading ? "pointer-events-none opacity-50" : ""
                    }`}
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-black mb-4">Forgot Password</h2>

                {!emailSent ? (
                    <>
                        <div className="flex flex-col p-3 gap-2 w-full">
                            <label htmlFor="email" className="text-blue-700 font-bold">
                                Email Address
                            </label>
                            <input
                                id="email"
                                className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full "
                                type="email"
                                required
                                placeholder="Enter your email"
                                name="email"
                                disabled={loading}
                            />
                        </div>

                        <button
                            className="px-4 py-2 w-90 tracking-wider bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Reset Password"}
                        </button>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="text-green-600 text-lg font-semibold mb-4">✓ Check Your Email</div>
                        <p className="text-gray-600 mb-4">
                            If an account with that email exists, we've sent a password reset link. The link will
                            expire in 1 hour. Please check your spam folder.
                        </p>
                    </div>
                )}

                <div className="mt-4">
                    <Link className="font-bold text-blue-700 hover:underline" to="/login">
                        ← Back to Login
                    </Link>
                </div>
            </form>

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
                        <MoonLoader size={40} color="#1e40af" />
                        <p className="text-blue-800 font-semibold">Sending reset link...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export { ForgotPasswordPage };