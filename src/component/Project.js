import React from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

export default function Project(props) {
  const b64 = Buffer.from(props.data.img.data).toString('base64');
  const mimeType = 'image/png';

  const handleDelete = async (e) => {
    e.preventDefault();
    const name = e.target.parentNode.querySelector('h4').innerHTML;
    if (window.confirm(`Do you really want to delete: ${name}?`)) {
      await fetch(`${process.env.REACT_APP_API}api/projects`, {
        method: "DELETE",
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`,
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          id: props.data._id
        })
      });
      props.remove(name);
    }
  }

  return (
    <div className="text-center w-full flex flex-col justify-between items-center">      
      <Link 
        to={`projects/${props.data._id}`}
        state={{ data: props.data }}         
      >
        <h4 className="text-center my-2 text-xl">{props.data.name}</h4>
        <img src={`data:${mimeType};base64,${b64}`} alt={props.data.name} className="border border-black"/>
      </Link>
      <button onClick={handleDelete} className="border rounded-lg text-black px-2 mt-2 hover:bg-red-500 hover:text-white justify-self-end">Delete</button>
    </div>
  )
};