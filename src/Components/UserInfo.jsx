import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AppContext";
import { IoIosArrowDown } from "react-icons/io";
import { LuCircleUser } from "react-icons/lu";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "../../utils/toastHelper";

const UserInfo = () => {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const { handleSetUser } = useAuthContext();
    const navigate = useNavigate();

    const userData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/users/minDetails`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const res = await response.json();
            setUserDetails(res.data);
        } catch (err) {
            console.log("Error in getting user Details Api", err.message);
        }
    };

    const HandleLogout = async () => {
        try {
            setLoading(true);
            // Kill any hover/focus transitions that might cause blur
            document.activeElement?.blur();

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const res = await response.json();

            if (response.status === 200) {
                successToast("Logout Success!!");
                handleSetUser({ isLoggedIn: false });
                // Redirect immediately before any blur transition happens
                navigate("/login", { replace: true });
            } else {
                errorToast(res.message);
            }
        } catch (err) {
            console.log("Error in Logout Api", err.message);
        } finally {
            setLoading(false);
        }
    };

    const HandleUserInfo = () => {
        navigate("/user");
    };

    useEffect(() => {
        userData();
    }, []);

    return (
        <div className="relative group inline-block">
            {/* User box */}
            <div className="flex items-center border-2 rounded-md p-3 gap-1.5 hover:scale-105 transition duration-300 cursor-pointer">
                <LuCircleUser size={20} />
                <span>{userDetails.UserName}</span>
                <IoIosArrowDown
                    size={20}
                    className="transition-transform duration-300 group-hover:rotate-180"
                />
            </div>

            {/* Dropdown */}
            <div className="absolute left-0 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                {/* Invisible gap bridge */}
                <div className="h-2 bg-transparent"></div>

                {/* Dropdown content */}
                <div className="flex flex-col gap-3 p-3 bg-white border rounded-md shadow-lg">
                    <button
                        onClick={HandleUserInfo}
                        className="bg-blue-500 px-3 py-2 text-left text-sm rounded-md text-white hover:bg-blue-600 transition cursor-pointer"
                    >
                        User Info
                    </button>
                    <button
                        onClick={HandleLogout}
                        disabled={loading}
                        className={`px-3 py-2 text-left text-sm rounded-md text-white transition cursor-pointer ${
                            loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { UserInfo };


