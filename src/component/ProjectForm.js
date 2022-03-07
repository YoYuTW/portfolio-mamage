import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";

export default function Projects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [updateOrNot, setUpdateOrNot] = useState(false);  
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {    
    if (param['*'] !== "projects/create") { 
      setUpdateOrNot(true);   
      setName(location.state.data.name);
      setDescription(location.state.data.description);
      setGithub(location.state.data.github);
      setLive(location.state.data.live);
    };
  }, [param, location]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleGithub = (e) => {
    setGithub(e.target.value);
  };

  const handleLive = (e) => {
    setLive(e.target.value);
  };  

  const handleCreate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (img) formData.append("img", img);
    formData.append("github", github);
    formData.append('live', live);
    await fetch(`${process.env.REACT_APP_API}api/projects`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });
    navigate('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (img) formData.append("img", img);
    formData.append("github", github);
    formData.append('live', live);
    formData.append('id', location.state.data._id);
    await fetch(`${process.env.REACT_APP_API}api/projects`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });
    navigate('/');
  };

  return (
    <div className="grow flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-gray-200 shadow-default py-10 px-16">
        <form onSubmit={updateOrNot ? handleUpdate : handleCreate}>
          <h1 className="text-2xl font-medium text-primary mb-4 text-center">
            {updateOrNot ? "Update project" : "Add New project"}
          </h1>
          <Input name="Name" required={true} type="text" value={name} onChange={handleName} />
          <Input name="Description" required={true} type="text" value={description} onChange={handleDescription} />
          <Input name="Img" required={false} type="file" onChange={handleImg} />
          <Input name="Github" required={true} type="text" value={github} onChange={handleGithub} />
          <Input name="Live" required={true} type="text" value={live} onChange={handleLive} />
          <div className="flex mx-auto mt-4 justify-around">
            <button type="submit" className="border border-black rounded-md px-2 py-1 w-20">{updateOrNot ? "Update" : "Add"}</button>
            <Link to="/" className="border border-black rounded-md px-2 py-1 w-20 text-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
};