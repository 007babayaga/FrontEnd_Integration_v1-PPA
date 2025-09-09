import { useState } from "react";
import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar"
import { IoMdEye,IoMdEyeOff } from "react-icons/io";
import { MoonLoader  } from "react-spinners";
import { erorrToast, successToast } from "../../utils/toastHelper";



const SignUpPage = ()=>{
    const[showPassword, setShowPassword] = useState(false);
    const[isOtpSent,setIsOtpSent] = useState(false);
    const[otpSending,setOtpSending] = useState(false);

    const HandleSignUp = async(e)=>{
        try{
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const otp = e.target.otp.value;
    
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signUp`,{
                method:"POST",
                body:JSON.stringify({
                    "name":name,
                    "email":email,
                    "password":password,
                    "otp":otp
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.status==201){
                successToast("SignUp Successful")
            }
            else{
                const result = await response.json();
                erorrToast(result.message);
            }
        }
        catch(err){
            erorrToast(`Unable To SignUp${err.message}`);
        }
    }
    const handleSendOpt = async(e)=>{
        try{
            setOtpSending(true);
            const email = e.target.email.value;
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`,{
                method:"POST",
                body:JSON.stringify({
                    email
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.status == 201){
                successToast("Otp send to Email")
                setIsOtpSent(true);
            }
            else{
                const result = await response.json();
                erorrToast(result.message);
            }
        }
        catch(err){
            erorrToast(`unable to send Otp: ${err.message}`)
        }
        finally{
            setOtpSending(false);
        }

    }
    const HandleSubmit = async(e)=>{
        e.preventDefault();
        if(isOtpSent){
            await HandleSignUp(e)
        }
        else{
            await handleSendOpt(e)
        }
    }

    return(
        <>
        <Navbar searchBox={false}/>
        <div className="flex pt-3 justify-center  bg-gray-100 min-h-screen ">
            <form className="flex flex-col items-center justify-center p-8 gap-4 bg-gray-50 rounded-md shadow-lg w-full max-w-md mx-4 mb-7" onSubmit={HandleSubmit}> 
                <h2 className="text-2xl font-bold text-blue-800 mb-7">Sign Up</h2> 
                <div className="flex flex-col p-3 gap-2 w-full">
                    <label className="text-blue-700 font-bold">
                    Enter Your Email
                    </label>
                    <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full read-only:cursor-not-allowed"
                    type="email"
                    required
                    placeholder="Enter Your Email" 
                    readOnly={isOtpSent}
                    name="email"/>
                    </div>
                {
                    isOtpSent &&(
                    <>
                    <div className="flex flex-col p-3 gap-2 w-full">
                    <label className="text-blue-700 font-bold">
                    Enter Your Name
                    </label>
                    <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    name="name"/>
                    </div>
                    <div className="flex flex-col p-3 gap-2 w-full">
                    <label className="text-blue-700 font-bold">
                    Enter OTP
                    </label>
                    <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                    type="text"
                    required
                    placeholder="Enter Otp"
                    name="otp"/>
                    </div>
                    <div className="flex flex-col p-3 gap-2 w-full relative">
                    <label className="text-blue-700 font-bold">
                    Enter Your Password
                    </label>
                    <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter Your Password" 
                    name="password"/>
                    <span
                    className="absolute right-3 top-3/5 -translate-y-1/5 -translate-3 cursor-pointer text-black"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                    </span>
                    </div>
                    </>
                    
                )}
                {
                    otpSending ?
                    <>
                    <MoonLoader />
                    </>
                    :
                    <>
                    {
                    isOtpSent ?
                    <button
                    className="px-4 py-2 w-80 tracking-wider  mt-6 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer w-full"
                    >
                    SignUp
                    </button>
                    :
                    <button
                    className="px-4 py-2 w-80 tracking-wider  mt-6 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer w-full "
                    >
                    Send Otp
                    </button>
                }
                    </>
                }
                

            </form>
        </div>
        <Footer />
        </>
    )
}
export{SignUpPage}