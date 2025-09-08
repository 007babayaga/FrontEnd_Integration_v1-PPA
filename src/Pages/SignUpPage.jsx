import { Navbar } from "../Components/Navbar"


const SignUpPage = ()=>{

    const HandleSubmit = async(e)=>{
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signUp`,{
            method:"POST",
            body:JSON.stringify({
                "name":name,
                "email":email,
                "password":password
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        alert(response.status);
        
    }

    return(
        <>
        <Navbar searchBox={false}/>
        <div className="flex pt-10 justify-center  bg-gray-100 min-h-screen ">
            <form className="flex flex-col items-center justify-center p-8 gap-3 bg-gray-50 rounded-md shadow-lg w-full max-w-md mx-4" onSubmit={HandleSubmit}> 
                <h2 className="text-2xl font-bold text-blue-800 mb-7">Sign Up</h2>          
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
                    Enter Your Email
                </label>
                <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                type="email"
                required
                placeholder="Enter Your Email" 
                email="email"/>
                </div>

                <div className="flex flex-col p-3 gap-2 w-full">
                <label className="text-blue-700 font-bold">
                    Enter Your Password
                </label>
                <input className="px-4 py-2 bg-white/90 rounded-md shadow-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                type="password"
                required
                placeholder="Enter Your Password" 
                password="password"/>
                </div>
                <button
                type="submit"
                className="px-4 py-2 w-80 tracking-wider  mt-6 bg-gradient-to-r from-[#1138b8] to-blue-600 rounded-md text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer w-full"
                >
                    SignUp
                </button>

            </form>
        </div>
        </>
    )
}
export{SignUpPage}