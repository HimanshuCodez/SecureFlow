import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      setIsLoggedIn(true);
      getUserData();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during Login:", error);
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={LoginHandler} className="space-y-5">
          {/* Email */}
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ring-indigo-400 transition">
            <Mail className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Password with Show/Hide */}
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ring-indigo-400 transition">
            <Lock className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full outline-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500 focus:outline-none"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      

        {/* Links */}
        <div className="mt-4 text-center text-sm text-gray-600 space-y-1">
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
          <p
            onClick={() => navigate("/forget-password")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Forgot your password?
          </p>
        </div>
      </div>
    </div>
  );
}
