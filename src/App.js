import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Layout from "./component/Layout";

export const LoginState = React.createContext();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch(`${process.env.REACT_APP_API}api/login`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`        
        },
      });
      const message = response.json();
      if (message === "authorized.") {
        setIsLogin(true)
      }
    };
    checkLogin();
  },[]);

  return (
    <BrowserRouter>
      <LoginState.Provider value={{ isLogin, setIsLogin }}>
        <Routes>                    
          <Route path="/login" element={<Login />} />  
          <Route path="/*" element={<Layout />} />                   
        </Routes>
      </LoginState.Provider>
    </BrowserRouter>
  )
}
