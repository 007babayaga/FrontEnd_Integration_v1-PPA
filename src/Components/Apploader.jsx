import { HashLoader   } from "react-spinners";

const Apploader = ()=>{
    return(
        <>
        <div className=" flex items-center justify-center min-h-screen gap-5 bg-gradient-to-tr from-sky-300 via-blue-400 to-indigo-500">
            <HashLoader  size={70}/>
            <h2 className="text-4xl font-bold">TrueBuy</h2>
        </div>
        </>
    )
}
export{Apploader}