import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${backendUrl}api/employees/login`, 
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );
      
      console.log(response);
      if (!response.data) {
        toast.error('Login failed: Invalid credentials or missing token');
        return;
      }
      
      
      try {
        
        sessionStorage.clear();
        

      } catch (storageError) {
        console.warn('Session storage failed, falling back to in-memory storage', storageError);
        
        window._authToken = response.data.token;
        
        
      }
      
      
      try {
        if (response.data.employee) {
          const userData = {
            id: response.data.employee.id,
            name: response.data.employee.name,
            email: response.data.employee.email,
            image: response.data.employee.image,
            role: response.data.employee.role,
            country: response.data.employee.country,
            contactno: response.data.employee.contactno,
            address: response.data.employee.address,
            salary: response.data.employee.salary,
            djoined: response.data.employee.djoined
          };
          sessionStorage.setItem('userData', JSON.stringify(userData));
        }
      } catch (e) {
        console.warn('Could not store user info', e);
      }
    
      toast.success(response.data.message);
      
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Login failed');
      } else {
        toast.error('An error occurred');
      }
    }
  };
  
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/logback.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-[#2C2C2C] p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-white text-lg mb-4">Agent Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-2 rounded border border-gray-500 bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 rounded border border-gray-500 bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#FFBB00] text-black py-2 rounded font-semibold hover:bg-yellow-600"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}