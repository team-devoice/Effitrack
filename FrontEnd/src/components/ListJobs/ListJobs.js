import React from 'react'
import datas from "../../lib/datas.json"
import JobCard from './JobCard'

const ListJobs = () => {
  const skillColors = {
    React: "#61DAFB",           // Light Blue
    JavaScript: "#F7DF1E",      // Yellow
    HTML: "#E34F26",            // Red
    CSS: "#1572B6",             // Blue
    "Tailwind CSS": "#38B2AC",  // Teal
    SQL: "#336791",             // Dark Blue
    Python: "#306998",          // Python Blue
    "Data Visualization": "#FF6F61", // Coral
    Excel: "#217346",           // Green
    Tableau: "#E97627",         // Orange
    "Node.js": "#8CC84B",       // Light Green
    MongoDB: "#47A248",         // MongoDB Green
    "API Development": "#FF5733",  // Bright Red
    AWS: "#FF9900",             // Orange
    "UI/UX Design": "#FF69B4",  // Pink
    Figma: "#A259FF",           // Purple
    "Adobe XD": "#FF61F6",      // Magenta
    Prototyping: "#FFD700",     // Gold
    Docker: "#2496ED",          // Docker Blue
    Kubernetes: "#326CE5",      // Dark Blue
    "CI/CD": "#29B6F6",         // Sky Blue
    Jenkins: "#D33833"          // Jenkins Red
  };
  
  
    console.log(datas)
  return (
    <div className='flex gap-4'>
      <div className=' overflow-y-scroll h-full w-full no-scrollbar'>{
        datas.map((job, key)=>{
            return(
                <JobCard jobdetails = {job} key={key} skillColors = {skillColors}/>
            )
        })
      }</div>
      <div className='w-[300px] hidden md:block py-2 dark:text-white noto-sans-normal'>
        <div className='text-2xl'>Filters</div>
        <div className='flex flex-wrap gap-2 mt-4'>
          {
            Object.keys(skillColors).map((skill, key) => {
              return (
                <div className='p-1 border rounded-lg' style={{ borderColor: skillColors[skill] }}>{skill}</div>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ListJobs