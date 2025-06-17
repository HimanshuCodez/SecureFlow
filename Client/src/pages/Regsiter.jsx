import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function Signup() {
  const { backendUrl, setIsLoggedIn } = useContext(AppContent);
  console.log("Backend URL:", backendUrl);
  
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const RegisterHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to create account");
      }

      setIsLoggedIn(true);
      toast.success("Account created successfully! Please verify your email.");
      navigate(`/email-verify?email=${encodeURIComponent(email)}`);

    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={RegisterHandler} className="space-y-5">
          {/* Name */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <User className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <Mail className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <Lock className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none text-sm"
              required
              minLength={8}
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
            Sign Up
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-center text-sm text-gray-600 space-y-1">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
          <p
            onClick={() => navigate("/reset-password")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Forgot your password?
          </p>
        </div>
      </div>
    </div>
  );
}
