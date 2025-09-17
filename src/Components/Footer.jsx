const Footer = ({loading})=>{
    return(
        <>
        <div  className={`bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-400 backdrop-blur-md p-7 
        ${loading ? "fixed bottom-0 left-0 w-full" : ""}`}>
            <p className="font-bold text-center">&copy; 2025 Rajat. All rights reserved.</p>
        </div>
        </>
    )
}
export{Footer};