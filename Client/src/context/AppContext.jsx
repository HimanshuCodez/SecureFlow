import { createContext, useState } from "react";

export const AppContent = createContext();  


export const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

const backendUrl = import.meta.env.VITE_BACKEND_URL


const value ={
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
}
  return (
    <AppContent.Provider value={value }>
      {props.children}
    </AppContent.Provider>
  );
};