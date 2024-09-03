import { Link } from "react-router-dom";
import datas from '../../lib/datas.json'
import { skillColors } from "../../lib/public_data";
import JobCard from "../ListJobs/JobCard";
const CreateJob = () => {
    const handleCreateJob = () =>{
        alert('Job Created Successfully')
    }

    return(
        <>
            <div className='flex gap-4 bg-white dark:bg-[#171717] dark:text-[#f3f3f3] rounded'>
                <div className='w-1/2 p-[16px] flex flex-col space-y-4 '>
                    {/* Second div, 80% width */}
                    <h1 className='text-2xl font-semibold'>Create Job Opening</h1>
                    <p className='noto-sans-normal'>Fill the details of <span className='text-blue-400'>Job Requirements</span></p>
                    <div className='flex flex-col space-y-4'>
                        {/* Full Name */}
                        <div className='flex flex-col space-y-2'>
                            <h1>Organization:</h1>
                            <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='Amazon' value={""}></input>
                        </div>
                        {/* Email */}
                        <div className='flex flex-col space-y-2'>
                            <h1>Employement Type:</h1>
                            <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='Onsite' value={""}></input>
                        </div>
                        {/* Phone Number & Age */}
                        <div className='flex space-x-4'>
                            <div className='w-1/2 space-y-2'>
                                <h1>Location:</h1>
                                <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='Coimbatore' value={""}></input>
                            </div>
                            <div className='w-1/2 space-y-2'>
                                <h1>Country:</h1>
                                <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='India' value={""}></input>
                            </div>
                        </div>
                        {/* Degree & College */}
                        <div className='flex space-x-4'>
                            <div className='w-1/2 space-y-2'>
                                <h1>Salary Starts:</h1>
                                <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='3.5 lakhs' value={""}></input>
                            </div>
                            <div className='w-1/2 space-y-2'>
                                <h1>Salary Ends:</h1>
                                <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='4.5 lakhs' value={""}></input>
                            </div>
                        </div>
                        {/* Skills */}
                        <div className='flex flex-col space-y-2'>
                            <h1>Skills:</h1>
                            <input className='w-full p-[8px] dark:bg-[#333]  border-gray-200 border-2 rounded-xl' placeholder='React, Vite etc.' value={""}></input>
                        </div>
                        {/* Submit Application */}

                        <div className='flex justify-center'>
                            <button className='bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded hover:bg-gray-600' onClick={handleCreateJob}>Create Job Opening</button>
                        </div>
                    </div>
                </div>
                {/* Jobs */}
                <div className="w-1/2 p-[16px] h-[650px] overflow-y-auto flex flex-col space-y-4 ">
                    <h1 className="text-2xl font-semibold">Related Job Openings:</h1>
                    {/* <div className=' overflow-y-scroll h-full w-full no-scrollbar'> */}
                        {
                        datas.map((job, key) => {
                            return (
                                <JobCard jobdetails={job} key={key} skillColors={skillColors} />
                            )
                        })
                    }
                    {/* </div> */}
                </div>
            </div>
            
        </>
    )
}

export default CreateJob;