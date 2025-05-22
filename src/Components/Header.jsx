import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 

const Header = () => {
    const [adminName, setAdminName] = useState("Agent");
    const [adminImage, setAdminImage] = useState("/images/admin.png"); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const userDataString = sessionStorage.getItem("userData");
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setAdminName(userData.name || "Agent"); 
                
                if (userData.image) {
                    setAdminImage(`data:image/png;base64,${userData.image}`);
                }
            } catch (error) {
                console.error("Error parsing userData:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        // Clear all items from sessionStorage
        sessionStorage.clear();
        
        toast.success("You have logged out successfully!");
      
        navigate("/login");
    };
    const handleProfile = () => {
      
        navigate("/profile");
    };
    
    return (
        <div className="w-full flex justify-between items-center border-b border-gray-300 p-4 bg-white">
            <div>
                <h1 className="text-xl font-semibold text-gray-700">
                    <span className="text-blue-500">Pearl</span> Logistics
                </h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
            <div className="flex items-center gap-4">
                <img src={adminImage} alt="Admin Avatar" className="w-10 h-10 rounded-full object-cover" />
                <h2 className="text-gray-700 text-lg font-semibold">
                    Welcome, <span className="font-bold">{adminName}</span>
                </h2>
                <button
                    className="border border-gray-300 px-5 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={handleProfile} 
                >
                    Profile
                </button>
                <button
                    className="border border-gray-300 px-5 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout} 
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Header;