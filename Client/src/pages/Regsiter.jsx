import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create an Account</h2>

        <form className="space-y-5">
          {/* Name Field */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <User className="text-gray-500 mr-2" />
            <input
            onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <Mail className="text-gray-500 mr-2" />
            <input
               onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Password Field with Show/Hide */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <Lock className="text-gray-500 mr-2" />
            <input
               onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
            Sign Up
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-4 text-center text-sm text-gray-600 space-y-1">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
          <p>
            <p onClick={()=>navigate("/reset-password")} className="text-indigo-600 cursor-pointer hover:underline">
              Forgot your password?
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
