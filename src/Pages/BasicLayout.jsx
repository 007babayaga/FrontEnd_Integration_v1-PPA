import { Outlet } from "react-router";
import { Navbar } from "../Components/Navbar";
import { useAuthContext } from "../context/AppContext";
import { CartSidebar } from "../Components/ui/CartSidebar";


const BasicLayout = () => {
    const {cart} = useAuthContext();

    const isCartEmpty = cart.length === 0;

    return (
        <>
            <div className={`grid ${isCartEmpty ? "grid-cols-1" : "grid-cols-[1fr_170px]"}`}>
                <div>
                    <Navbar />
                    <Outlet />
                </div>
                {
                    !isCartEmpty &&(<CartSidebar/>)
                }
            </div>
        </>
    )
}
export { BasicLayout }