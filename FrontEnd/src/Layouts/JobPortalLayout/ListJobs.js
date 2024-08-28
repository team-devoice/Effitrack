import React from 'react'
import Navbar from '../../components/Dashboard/Navbar'
import ListJobs from '../../components/ListJobs/ListJobs'
import { Outlet } from 'react-router-dom'
const JobsLayout = () => {
  return (
    <div className='p-3 bg-[#e1e1e1] dark:bg-[#333] overflow-auto no-scrollbar'>
        <Navbar title={"Jobs"} />
        <Outlet/>
    </div>
  )
}

export default JobsLayout