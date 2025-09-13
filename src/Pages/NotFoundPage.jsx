import { Link } from "react-router"
import myImg from "../Assets/8632.jpg";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

const NotFoundPage = ({user})=>{
    const{isLoggedIn} = user;

    return(
        <>
        <Navbar/>
        <div className="flex justify-center ">
        <img className="h-110 " src={myImg} alt="Not Found Image"></img>
        </div>
        <div className="flex justify-center">
            {
                isLoggedIn ?
                <Link 
                className="p-3 bg-blue-500 rounded-md text-white hover:scale-105 transition-all duration-300" to="/">
                Back to Home
                </Link>
                :
                <Link 
                className=" tracking-wider  p-3 bg-blue-500 rounded-md text-white hover:scale-105 transition-all duration-300" to="login">
                Login First
                </Link>
            }
        </div>
        <Footer/>
        </>
    )
}
export{NotFoundPage}