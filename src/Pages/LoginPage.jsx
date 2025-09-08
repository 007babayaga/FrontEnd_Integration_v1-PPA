import { Link } from "react-router"
import { Navbar } from "../Components/Navbar"

const LoginPage = ()=>{
    return(
        <>
        <Navbar searchBox={false}/>
        <div className="flex flex-col justify-center items-center gap-3">
        <p>LoginPage</p>
        <Link className="underline text-blue-800" to="/signUp ">Go To SignUp Page</Link>
        </div>
        </>
    )
}
export{LoginPage}