import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();  


export const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

const backendUrl = import.meta.env.VITE_BACKEND_URL


const getAuthState = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
      withCredentials: true,
    });
    if (data.success) {
      setIsLoggedIn(true);
        getUserData();
    }
    
  } catch (error) {
    console.error("Error fetching auth status:", error);
    toast.error("Failed to fetch authentication status. Please try again.");
  }
};
const getUserData = async () => {
  try {
    const {data} = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
    });
    setUserData(data.userData);
    toast.success("User data fetched successfully!");
  } catch (error) {
    console.error("Error fetching user data:", error);
    toast.error("Failed to fetch user data. Please try again.");
  }
}

useEffect(() => {
    getAuthState();
    
}
, []);
const value ={
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
}
  return (
    <AppContent.Provider value={value }>
      {props.children}
    </AppContent.Provider>
  );
};