import React, { useState, useContext } from "react";
import { LoginState } from "../App";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginState = useContext(LoginState);

  const login = async (username, password) => {
    const response = await fetch(`${process.env.REACT_APP_API}api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",        
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const message = await response.json();
    if (message.error) {
      setError(message.error)
      return
    }
    localStorage.setItem("token", message.token);
    loginState.setIsLogin(true);    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <React.Fragment>
      {loginState.isLogin ? <Navigate to="/" replace={true} /> :
      <div className="h-screen flex bg-gray-100">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-gray-200 shadow-default py-10 px-16">
          <h1 className="text-2xl font-medium text-primary mb-8 text-center">Admin</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                id="username"
                value={username}
                onChange={handleUsername}
                required
                className="w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="username"
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                required
                className="w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4" />
            </div>
            {error ? <div className="text-red-400">{`*${error}`}</div> : null}
            <div className="flex justify-center item-center mt-6">
              <button
                type="submit"
                className="bg-green-700 py-2 px-4 text-sm text-white rounded border border-green-700 hover:outline-none hover:border-green-100"
              >Login</button>
            </div>
          </form>
        </div>
      </div>}
    </React.Fragment>
  )
};

export default Login;