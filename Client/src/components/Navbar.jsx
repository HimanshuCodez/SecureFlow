import { Menu, User, LogIn, LogOut, ShieldCheck } from "lucide-react";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // mock state
const navigate = useNavigate();
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
          <a href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </a>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <User className="text-blue-600" />
              <span className="text-gray-800">Himanshu</span>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                href="/login"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <LogIn size={18} />
                Login
              </button>
              <a
                href="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-1"
              >
                <User size={18} />
                Register
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu size={24} className="text-gray-800" />
        </div>
      </div>
    </nav>
  );
}
