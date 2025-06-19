import { useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function SocialAuthSuccess() {
  const { setIsLoggedIn, getUserData,backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
 const verifyUser = async () => {
  try {
 
    const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`,{
        withCredentials: true, 
    });

    if (data.success) {
      setIsLoggedIn(true);
      getUserData();
      toast.success("Login successful!");
      navigate("/");
    } else {
      throw new Error(data.message || "Authentication failed.");
    }
  } catch (error) {
    toast.error("Something went wrong. Please login again.");
    navigate("/login");
  }
};

    verifyUser();
  }, [setIsLoggedIn, getUserData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-indigo-600 font-semibold">Redirecting... Please wait</p>
      </div>
    </div>
  );
}
