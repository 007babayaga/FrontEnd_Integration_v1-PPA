import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AppContext";
import { IoIosArrowDown } from "react-icons/io";
import { LuCircleUser } from "react-icons/lu";
import { useNavigate } from "react-router";

const UserInfo = () => {
    const [userDetails, setUserDetails] = useState({});
    const { HandleLogout } = useAuthContext();
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

    const HandleUserInfo = ()=>{
        navigate("/user")
    }

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

            {/* Dropdown with invisible padding to bridge the gap */}
            <div className="absolute left-0 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Invisible bridge - 10px gap filler */}
                <div className="h-2 bg-transparent"></div>

                {/* Actual dropdown content */}
                <div className=" flex flex-col gap-3 p-3 bg-white border rounded-md shadow-lg">
                    <button
                    onClick={HandleUserInfo}
                        className=" bg-blue-500 px-3 py-2 text-left text-sm rounded-md text-white hover:bg-blue-600 transition cursor-pointer"
                    >
                        UserInfo
                    </button>
                    <button
                        onClick={HandleLogout}
                        className=" bg-blue-500 px-3 py-2 text-left text-sm rounded-md text-white hover:bg-blue-600 transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export { UserInfo };
