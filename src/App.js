import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Layout from "./component/Layout";

export const LoginState = React.createContext();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true)
    }
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
