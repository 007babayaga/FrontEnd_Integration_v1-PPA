import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AppContext";

const UserInfoPage = () => {
    const [user, setUser] = useState({});
    const{cart}= useAuthContext();


    const getUserAllDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/allDetails`, {
                method: "GET",
                credentials: "include"
            })
            const res = await response.json();
            setUser(res.data.userDetails);
        }
        catch (err) {
            console.log("Error in getUserAllDetails", err.message)
        }
    }

    useEffect(() => {
        getUserAllDetails();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-blue-700">User Profile</h1>
                    </div>

                    {/* Simple Card */}
                    <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6">
                        {/* User Avatar */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
                                <span className="text-2xl font-bold text-blue-700">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-blue-600 font-medium mb-1">Name</label>
                                <div className="p-3 bg-blue-50 rounded border border-blue-100">
                                    <p className="text-gray-800">{user.name}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-blue-600 font-medium mb-1">Email</label>
                                <div className="p-3 bg-blue-50 rounded border border-blue-100">
                                    <p className="text-gray-800">{user.email}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-blue-600 font-medium mb-1">Total Items InCart</label>
                                <div className="p-3 bg-blue-50 rounded border border-blue-100">
                                    <p className="text-gray-800">{cart.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { UserInfoPage }