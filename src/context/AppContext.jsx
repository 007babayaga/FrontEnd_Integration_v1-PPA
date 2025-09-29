import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { erorrToast, successToast } from "../../utils/toastHelper";


const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
    
    const [user, setUser] = useState({ isLoggedIn: false })
    const [appLoading, setAppLoading] = useState(true);
    const [updatingCartState,setUpdatingCartState] = useState(false);
    const [cart, setCart] = useState([]);
    const [placingOrder,setPlacingOrder] = useState(false);
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
    }, []); 

    useEffect(() => {
        if(isLoggedIn){
            getCartItems();
        }
        else{
            setCart([])
        }
    }, [isLoggedIn]); 

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
            if(response.status===200){
                setCart(res.items.data);
            }
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
            setUpdatingCartState(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/add/${productId}`,{
                method:"POST",
                credentials:"include"
            })
            const res = await response.json();
            setCart(res.items.data)
        }
        catch(err){
            console.log("Error in Add Product Api",err.message);
        }
        finally{
            setUpdatingCartState(false);
        }
    }

    const RemoveFromCart = async(productId) => {
        try{
            setUpdatingCartState(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`,{
                method:"POST",
                credentials:"include"
            })
            const res = await response.json();
            setCart(res.items.data)
            
        }
        catch(err){
            console.log("Error in Remove Product Api",err.message);
        }
        finally{
            setUpdatingCartState(false);
        }
    };

    const handleCheckout =async(address)=>{
        try{
            setPlacingOrder(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`,{
                method:"POST",
                credentials:"include",
                body:JSON.stringify({address}),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const res = await response.json();
            if(response.status===201){
                successToast("Order placed SuccessFullly")
                setCart([]);
            }
            else{
                erorrToast(res.message);
            }
        }
        catch(err){
            console.log("Error in Placing Order Api",err.message);
        }
        finally{
            setPlacingOrder(false);
        }
    }

    const sharedValues = {
        appLoading,
        isLoggedIn,
        user,
        handleSetUser,
        HandleLogout,
        cart,
        AddToCart,
        RemoveFromCart,
        updatingCartState,
        getCartItems,
        handleCheckout,
        placingOrder
    }

    return (
        <>
        <AuthContext.Provider value={sharedValues}>
            {children}
        </AuthContext.Provider>
        </>
    )
}
const useAuthContext = () => {
    return useContext(AuthContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AppContextProvider, useAuthContext }