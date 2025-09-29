import { Outlet, useLocation } from "react-router";
import { Navbar } from "../Components/Navbar";
import { useAuthContext } from "../context/AppContext";
import { CartSidebar } from "../Components/ui/CartSidebar";

const BasicLayout = () => {
    const { cart } = useAuthContext();
    const location = useLocation();
    const isCartEmpty = cart.length === 0;

    // Defined routes where CartSidebar should not appear
    const hideCartSidebarRoutes = ["/cart", "/user"];
    const shouldShowCartSidebar = !isCartEmpty && !hideCartSidebarRoutes.includes(location.pathname);

    return (
        <>
            <div className={`grid ${shouldShowCartSidebar ? "grid-cols-[1fr_170px]" : "grid-cols-1"}`}>
                <div>
                    <Navbar />
                    <Outlet />
                </div>
                {shouldShowCartSidebar && <CartSidebar />}
            </div>
        </>
    );
};

export { BasicLayout };