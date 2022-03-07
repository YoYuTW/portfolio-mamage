import React, { useContext } from "react";
import { LoginState } from "../App";
import { Navigate, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import ProjectForm from "./ProjectForm";
import SkillForm from "./SkillForm";

export default function Layout() {  
  const isLogin = useContext(LoginState).isLogin;
  const setLogin = useContext(LoginState).setIsLogin;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setLogin(false);
  };

  return (
    <React.Fragment>
      {isLogin ? 
        <div className="min-h-screen flex flex-col">          
          <nav className="flex justify-between items-center py-2 px-24 h-32 bg-slate-400">
            <Link to="/" className="link">Management</Link>          
            <button onClick={handleLogout} className="text-gray-500 hover:text-gray-200 font-medium text-2xl">Log Out</button>            
          </nav>
          <Routes>            
            <Route index element={<Home/>} />
            <Route path="skills">
              <Route path=":skillId" element={<SkillForm />} />  
              <Route path="create" element={<SkillForm />} />
            </Route> 
            <Route path="projects">
              <Route path=":projectId" element={<ProjectForm />} />  
            </Route>                       
          </Routes>
        </div> :
      <Navigate to="/login" replace={true} />}
    </React.Fragment>
  )
};