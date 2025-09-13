import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"

const HomePage = ({user})=>{
    return(
        <>
        <Navbar user={user}/>
        <p>HomePage</p>
        <Footer/>
        </>
    )
}
export{HomePage}