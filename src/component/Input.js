import React from "react";

export default function Input(props) {
  return (
    <div>
      <label htmlFor={props.name} className={props.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>{props.name}</label>
      <input 
        required={props.required}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        className="w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
      />
    </div>
  )
};