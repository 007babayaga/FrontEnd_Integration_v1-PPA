import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { erorrToast, successToast } from "../../utils/toastHelper";



const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoggedIn: false })
    const [appLoading, setAppLoading] = useState(true);
    const[addingProductToCart,setAddingProductToCart] = useState(false);
    const [cart, setCart] = useState([]);
    const { isLoggedIn } = user;

    const isUserLoggedIn = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
                method: "GET",
                credentials: "include"
            })
            const result = await response.json();
            if (response.status == 200) {
                setUser({
                    isLoggedIn: true,
                    ...result.data.user,
                })
            }
            else {
                erorrToast("Please Login First!!")
            }
        }
        catch (err) {
            erorrToast(`Error in User Validation ${err.message}`)
        }
        finally {
            setAppLoading(false)
        }
    }

    useEffect(() => {
        isUserLoggedIn();
        getCartItems();
    }, []);
    

    const HandleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                method: "GET",
                credentials: "include",
            })
            const res = await response.json();
            if (response.status === 200) {
                successToast("Logout Success!!")
                setUser({ isLoggedIn: false })
            }
            else {
                erorrToast(res.message);
            }
        }
        catch (err) {
            console.log("Error in Logout Api", err.message);
        }
        finally{
            setAppLoading(false)
        }
    }

    const handleSetUser = (data) => {
        setUser(data)
    }

    const getCartItems = async() => { 
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart`,{
                method:"GET",
                credentials:"include"
            })
            const res = await response.json()
            setCart(res.items.data);
        }
        catch(err){
            console.log("Error in Getting carts items",err.message);
        }
        finally{
            // addingProductToCart(false)
        }
    }

    const AddToCart = async(productId) => { 
        try{
            setAddingProductToCart(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`,{
                method:"POST",
                credentials:"include"
            })
            getCartItems();
        }
        catch(err){
            console.log("Error in Add Product Api",err.message);
        }
        finally{
            setAddingProductToCart(false);
        }
    }

    const RemoveFromCart = (product) => {
        setCart((prev) => {
            const temp = { ...prev };
            if (temp[product._id]) {
                if (temp[product._id].cartQuantity > 1) {
                    temp[product._id] = {...temp[product._id],cartQuantity: temp[product._id].cartQuantity - 1};
                } else {
                    delete temp[product._id];
                }
            }
            return temp; 
        });
    };

    const sharedValues = {
        appLoading,
        isLoggedIn,
        user,
        handleSetUser,
        HandleLogout,
        cart,
        AddToCart,
        RemoveFromCart,
        addingProductToCart,
        getCartItems
    }

    return (
        <>
        <AuthContext value={sharedValues}>
            {children}
        </AuthContext>
        </>
    )
}
const useAuthContext = () => {
    return useContext(AuthContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AppContextProvider, useAuthContext }