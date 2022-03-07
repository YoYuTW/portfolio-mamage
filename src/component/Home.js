import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skill from "./Skill";
import Project from "./Project";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const skillsResponse = await fetch(`${process.env.REACT_APP_API}api/skills`);
      const skillData = await skillsResponse.json();      
      const projectsResponse = await fetch(`${process.env.REACT_APP_API}api/projects`);
      const projectData = await projectsResponse.json();
      setLoading(false)
      setSkills(skillData.skills);      
      setProjects(projectData.projects);
    };
    fetchData();
  }, []);

  const removeSkill = (name) => {    
    const names = skills.map(element => element.name);
    const id = names.indexOf(name);
    if (id === -1) {
      return 
    }    
    const skillsAfterRemove = skills.filter((element, i) => i !== id);
    setSkills(skillsAfterRemove);
  };

  const removeProject = (name) => {    
    const names = projects.map(element => element.name);
    const id = names.indexOf(name);
    if (id === -1) {
      return 
    }    
    const projectsAfterRemove = projects.filter((element, i) => i !== id);
    setProjects(projectsAfterRemove);
  }
  
  return (
    <div className="bg-gray-100 flex flex-col justify-evenly items-center grow pt-20">
      <div className="card">
        <h2 className="text-center text-2xl font-bold mb-12">Skills</h2>        
        {loading ?
          <div className="lds-ring">
            <div /><div /><div /><div />
          </div>:
          <div className="grid grid-cols-5 place-items-center gap-y-8">
            {skills.map((element, i) => <Skill key={i} data={element} remove={removeSkill}/>)}
          </div>
        }
        <div className="w-full flex justify-end item-center mt-8 px-2">
          <Link 
            to="skills/create" 
            className="w-10 flex justify-center items-center border border-black rounded-md h-10 hover:bg-gray-100"
          >Add
          </Link>
        </div>        
      </div>
      <div className="card">
        <h2 className="text-center text-2xl font-bold mb-12">Projects</h2>
        {loading ?
          <div className="lds-ring">
            <div /><div /><div /><div />
          </div>:
          <div className="grid grid-cols-3 place-items-center gap-8">
            {projects.map((element, i) => <Project key={i} data={element} remove={removeProject} />)}
          </div>
        }
        <div className="w-full flex justify-end item-center mt-8 px-2">
          <Link 
            to="projects/create" 
            className="w-10 flex justify-center items-center border border-black rounded-md h-10 hover:bg-gray-100"
          >Add
          </Link>
        </div>  
      </div>
    </div>
  )
};