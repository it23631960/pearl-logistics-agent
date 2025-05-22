import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    image: "",
    country: "",
    contactno: "",
    address: "",
    salary: "",
    djoined: ""
  });
  
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(prevData => ({
        ...prevData,
        ...parsedData
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "id" || name === "role" || name === "salary" || name === "djoined") {
      return;
    }
    
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setUserData({
        ...userData,
        image: base64String
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      
     
      const requestBody = {
        name: userData.name || "",
        email: userData.email || "",
        country: userData.country || "",
        contactno: userData.contactno ? parseInt(userData.contactno, 10) : 0,
        address: userData.address || "",
        imageBase64: userData.image || ""
      };

      const response = await axios.put(
        `${backendUrl}api/employees/update/${userData.id}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        
        const storedUserData = sessionStorage.getItem("userData");
        const currentData = storedUserData ? JSON.parse(storedUserData) : {};
        
        
        const updatedUserData = {
          ...currentData,
          name: userData.name || currentData.name,
          country: userData.country || currentData.country,
          email: userData.email || currentData.email,
          image: userData.image || currentData.image,
          contactno: userData.contactno || currentData.contactno,
          address: userData.address || currentData.address
        };
        
        sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
        
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Profile</h1>
      <div className="bg-white  rounded p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden cursor-pointer mb-2"
              onClick={handleImageClick}
            >
              {userData.image ? (
                <img 
                  src={`data:image/jpeg;base64,${userData.image}`}
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
            </div>
            <button 
              type="button" 
              className="text-blue-500"
              onClick={handleImageClick}
            >
              Change Image
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Employee ID</label>
              <input 
                type="text" 
                name="id" 
                value={userData.id} 
                className="w-full px-3 py-2 border rounded-md bg-gray-100" 
                readOnly 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee Name</label>
              <input 
                type="text" 
                name="name" 
                value={userData.name} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee Country</label>
              <input 
                type="text" 
                name="country" 
                value={userData.country} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Applying Role</label>
              <input 
                type="text" 
                name="role" 
                value={userData.role} 
                className="w-full px-3 py-2 border rounded-md bg-gray-100" 
                readOnly 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee Contact No</label>
              <input 
                type="text" 
                name="contactno" 
                value={userData.contactno} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee Email</label>
              <input 
                type="email" 
                name="email" 
                value={userData.email} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee Address</label>
              <input 
                type="text" 
                name="address" 
                value={userData.address} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee Salary</label>
              <input 
                type="text" 
                name="salary" 
                value={userData.salary} 
                className="w-full px-3 py-2 border rounded-md bg-gray-100" 
                readOnly 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employee D joined</label>
              <input 
                type="text" 
                name="djoined" 
                value={userData.djoined} 
                className="w-full px-3 py-2 border rounded-md bg-gray-100" 
                readOnly 
              />
            </div>
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="bg-black hover:bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;