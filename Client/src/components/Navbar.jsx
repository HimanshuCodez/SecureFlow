import { Menu, X, User, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, backendUrl, setUserData, userData } =
    useContext(AppContent);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
        toast.success("Logout successful!");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-blue-600 text-xl font-bold">
          <ShieldCheck size={26} />
          <span>SecureFlow</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/get-api" className="text-gray-700 hover:text-blue-600 transition">
            Get API
          </Link>

          {isLoggedIn && userData ? (
            <div className="flex items-center gap-3">
              <span className="text-white bg-black justify-center items-center flex relative group rounded-full w-8 h-8">
                {userData.name[0].toUpperCase()}
              </span>
              <button
                onClick={logout}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <LogIn size={18} />
                Login
              </button>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-1"
              >
                <User size={18} />
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/get-api" className="block text-gray-700 hover:text-blue-600">
            Get API
          </Link>

          {isLoggedIn && userData ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-white bg-black rounded-full w-8 h-8 flex justify-center items-center">
                  {userData.name[0].toUpperCase()}
                </span>
                <span className="text-gray-800 font-medium">{userData.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <LogIn size={18} />
                Login
              </button>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-1"
              >
                <User size={18} />
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
