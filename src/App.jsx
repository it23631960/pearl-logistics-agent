import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Header from "./Components/Header";
import Login from "./pages/Login";
import AddItems from "./pages/AddItems";
import ProductList from "./pages/ProductList";
import OrdersList from "./pages/OrdersList";
import CustomOrders from "./pages/CustomOrders";
import Employees from "./pages/Employees";
import Tickets from "./pages/Tickets";
import Clients from "./pages/Clients";
import EmployeeDetails from "./Components/EmployeeDetails";
import ClientDetails from "./Components/ClientDetails";
import Profile from "./pages/Profile";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const hideHeaderNavRoutes = ["/login"];
  const showLayout = !hideHeaderNavRoutes.includes(location.pathname);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("userData");
  //   if (!token && location.pathname !== "/login") {
  //     navigate("/login");
  //   }
  // }, [location, navigate]);

  return (
    <>
      <ToastContainer />

      {showLayout ? (
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <NavigationBar />
            <main className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<AddItems />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-items" element={<AddItems />} />
                <Route path="/list-items" element={<ProductList />} />
                <Route path="/custom-orders" element={<CustomOrders />} />
                <Route path="/all-orders" element={<OrdersList />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/client/:id" element={<ClientDetails />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employee/:id" element={<EmployeeDetails />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
