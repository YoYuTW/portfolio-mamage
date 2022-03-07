import React from "react";
import { Link } from "react-router-dom";

export default function Skill(props) {

  const handleDelete = async (e) => {
    e.preventDefault();
    const name = e.target.parentNode.querySelector('h4').innerHTML;
    if (window.confirm(`Do you really want to delete: ${name}?`)) {
      await fetch(`${process.env.REACT_APP_API}api/skills`, {
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
    <div className="text-center w-20">
      <Link 
        to={`skills/${props.data._id}`}
        state={{ data: props.data }}        
      >
        <i className={`${props.data.link} text-6xl`} />
        <h4 className="text-center mt-5">{props.data.name}</h4>
      </Link>
      <button onClick={handleDelete} className="border rounded-lg text-black px-2 mt-2 hover:bg-red-500 hover:text-white">Delete</button>
    </div>
  )
};