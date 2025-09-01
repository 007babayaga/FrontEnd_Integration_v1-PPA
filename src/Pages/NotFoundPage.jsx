import { Link } from "react-router"
import myImg from "../Assets/8632.jpg";

const NotFoundPage = ()=>{
    return(
        <>
        <div className="flex justify-center ">
        <img className="h-130 " src={myImg} alt="Not Found Image"></img>
        </div>
        <div className="flex justify-center">
        <Link className="p-4 bg-blue-500 rounded-md text-white" to="/">Back to Home</Link>
        </div>
        </>
    )
}
export{NotFoundPage}