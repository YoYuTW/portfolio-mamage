import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";

export default function Skills() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [updateOrNot, setUpdateOrNot] = useState(false);  
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {    
    if (param['*'] !== "skills/create") { 
      setUpdateOrNot(true);   
      setName(location.state.data.name);
      setLink(location.state.data.link);
    };
  }, [param, location]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}api/skills`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    });
    navigate('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}api/skills`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        id: location.state.data._id,
        name,
        link
      })
    });
    navigate('/')
  };

  return (
    <div className="grow flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-gray-200 shadow-default py-10 px-16">
        <form onSubmit={updateOrNot ? handleUpdate : handleCreate}>
          <h1 className="text-2xl font-medium text-primary mb-4 text-center">
            {updateOrNot ? "Update Skill" : "Add New Skill"}
          </h1>
          <Input name="Name" required={true} type="text" value={name} onChange={handleName} />
          <Input name="Link" required={true} type="text" value={link} onChange={handleLink} />
          <div className="flex mx-auto mt-4 justify-around">
            <button type="submit" className="border border-black rounded-md px-2 py-1 w-20">{updateOrNot ? "Update" : "Add"}</button>
            <Link to="/" className="border border-black rounded-md px-2 py-1 w-20 text-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
};