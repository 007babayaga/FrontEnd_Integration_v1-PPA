import { useState } from "react";
import { Footer } from "../Components/Footer";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MoonLoader } from "react-spinners";
import { erorrToast, successToast } from "../../utils/toastHelper";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [signUpUser, setSignUpUser] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    // Password requirements regex
    const passwordRegex = {
        minLength: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/,
        specialChar: /[@$!%*?&]/
    };

    const HandlePasswordChange = (value) => {
        setPassword(value);
    };


    const HandleSignUp = async (e) => {
        try {
            setSignUpUser(true);
            const name = e.target.name.value;
            const email = e.target.email.value;
            const otp = e.target.otp.value;

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signUp`, {
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                    "otp": otp
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status == 201) {
                const result = await response.json();
                successToast(result.message)
                navigate("/login");
            }
            else if (response.status == 409) {
                const result = await response.json();
                erorrToast(result.message)
                navigate("/login");
            }
            else {
                const result = await response.json();
                erorrToast(result.message);
            }
        }
        catch (err) {
            erorrToast(`Unable To SignUp${err.message}`);
        }
        finally {
            setSignUpUser(false);
        }
    };

    const handleSendOpt = async (e) => {
        try {
            setOtpSending(true);
            const email = e.target.email.value;
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
                method: "POST",
                body: JSON.stringify({
                    email
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status == 201) {
                successToast("Otp send SuccessFully!")
                setIsOtpSent(true);
            }
            else {
                const result = await response.json();
                erorrToast(result.message);
            }
        }
        catch (err) {
            erorrToast(`unable to send Otp: ${err.message}`)
        }
        finally {
            setOtpSending(false);
        }
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (isOtpSent) {
            await HandleSignUp(e);
        }
        else {
            await handleSendOpt(e);
        }
    };

    return (
        <>
            <div className="flex pt-3 justify-center  bg-gray-100 min-h-screen ">
                <ToastContainer />
                <form className="flex flex-col items-center justify-center p-8 gap-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 mb-7 transition-all hover:scale-[1.01]" onSubmit={HandleSubmit}>
                    <h2 className="text-2xl font-bold text-blue-800 mb-7">Sign Up</h2>
                    <div className="flex flex-col p-3 gap-2 w-full">
                        <label className="text-blue-700 font-bold">
                            Enter Your Email
                        </label>
                        <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full read-only:cursor-not-allowed "
                            type="email"
                            required
                            placeholder="Enter Your Email"
                            readOnly={isOtpSent}
                            name="email" />
                    </div>
                    {
                        isOtpSent && (
                            <>
                                <div className="flex flex-col p-3 gap-2 w-full">
                                    <label className="text-blue-700 font-bold">
                                        Enter Your Name
                                    </label>
                                    <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                                        type="text"
                                        required
                                        placeholder="Enter Your Name"
                                        name="name" />
                                </div>
                                <div className="flex flex-col p-3 gap-2 w-full">
                                    <label className="text-blue-700 font-bold">
                                        Enter OTP
                                    </label>
                                    <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                                        type="text"
                                        required
                                        placeholder="Enter Otp"
                                        name="otp" />
                                </div>
                                <div className="relative flex flex-col p-3 gap-2 w-full">
                                    <label className="text-blue-700 font-bold">
                                        Enter Your Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 transition w-full pr-10"
                                            onChange={(e) => { HandlePasswordChange(e.target.value) }}
                                            value={password}
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="Enter Your Password"
                                            name="password"
                                        />
                                        <span
                                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                                        </span>
                                    </div>

                                    {/* Password Requirements */}
                                    {password && (
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Password must contain:</p>
                                            <ul className="text-xs space-y-1">
                                                <li className={`flex items-center ${passwordRegex.minLength.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {passwordRegex.minLength.test(password) ? '✓' : '✗'} At least 8 characters
                                                </li>
                                                <li className={`flex items-center ${passwordRegex.uppercase.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {passwordRegex.uppercase.test(password) ? '✓' : '✗'} One uppercase letter
                                                </li>
                                                <li className={`flex items-center ${passwordRegex.lowercase.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {passwordRegex.lowercase.test(password) ? '✓' : '✗'} One lowercase letter
                                                </li>
                                                <li className={`flex items-center ${passwordRegex.number.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {passwordRegex.number.test(password) ? '✓' : '✗'} One number
                                                </li>
                                                <li className={`flex items-center ${passwordRegex.specialChar.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {passwordRegex.specialChar.test(password) ? '✓' : '✗'} One special character (@$!%*?&)
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </>

                        )}
                    {
                        otpSending || signUpUser ?
                            <>
                                <MoonLoader size={30} />
                            </>
                            :
                            <>
                                {
                                    isOtpSent ?
                                        <button
                                            type="submit"
                                            className="px-3 w-90 py-2  tracking-wider mt-6 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer "
                                        >
                                            SignUp
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className="px-4 py-2 w-90  tracking-wider mt-6 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                        >
                                            Send Otp
                                        </button>
                                }
                                <div>
                                    <Link className="font-bold w-full tracking-wider" to="/login">Already have an Account? <span className="text-blue-700 text-decoration: underline">Login Here</span></Link>
                                </div>
                            </>
                    }
                </form>
            </div>
            <Footer />
        </>
    )
}
export { SignUpPage }