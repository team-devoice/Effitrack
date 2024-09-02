import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tag from '../Tag';
import { Link } from 'react-router-dom';
// Importing toastify module
import { toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import { calculateSkillMatchRate } from '../../services/helper';

const JobPopUp = ({ jobdetails, skillColors, isOpen, setIsOpen }) => {

    const { userDetials, addUserDetails } = useSelector(state => state.userDetails);

    useEffect(() => {
        console.log(addUserDetails)
    }, [userDetials, addUserDetails])

    function handleclosePopup() {
        setIsOpen(false);
    }

    const handleApply = () =>{
        alert('Application Submitted Successfully')
        setIsOpen(false);
    }

    return (
        <>
            {/* <button onClick={openPopup} className="bg-blue-500 text-white px-4 py-2 rounded">Open Pop-up</button> */}

            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40" >

                <div className="bg-white dark:bg-[#171717] dark:text-[#f3f3f3] rounded shadow-lg text-black w-[70%] mx-auto relative  h-[600px] overflow-y-auto">
                    <button onClick={handleclosePopup} className="absolute right-4 top-4">
                        <span class="material-icons-sharp hover:text-red-500 ">
                            close
                        </span>
                    </button>
                    {/* <div className=''> */}
                    <div className='flex'>
                        <div className='w-1/4 p-[16px] flex flex-col space-y-8 bg-zinc-100 dark:bg-zinc-800'>
                            {/* First div, 20% width */}

                            <h1 className='text-xl font-bold'>Apply To:</h1>
                            <div className='text-lg font-semibold flex flex-col space-y-4'>
                                <div className='flex flex-row space-x-2 items-center'>
                                    <img src={jobdetails.logo} alt='company logo' className='h-[50px] w-[50px] rounded-full' />
                                    <div className=''>{jobdetails.companyName}</div>
                                </div>
                                <div>
                                    <h1>Location</h1>
                                    <p className='text-gray-500 font-light'>{jobdetails.location}</p>
                                </div>
                                <div>
                                    <h2 className=''>Role</h2>
                                    <h2 className='text-gray-500'>{jobdetails.role}</h2>
                                </div>
                                <div>
                                    <h2 className=''>Job Type</h2>
                                    <h2 className='text-gray-500'>{jobdetails.workType}</h2>
                                </div>
                                {/* Salary Range */}
                                <div>
                                    <h2 className=''>Salary Range:</h2>
                                    <h2 className='text-gray-500 text-sm'>{jobdetails.salary}</h2>
                                </div>
                                <div>
                                    <h2>Skills Required</h2>
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        {
                                            jobdetails.skillsRequired.map((skill, key) => {
                                                return (
                                                    <Tag key={key} skill={skill} skillColors={skillColors} />
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                {/* Job Description */}
                                <div className=''>
                                    <h2>Job Description</h2>
                                    <p className='text-gray-500 overflow-hidden text-sm text-ellipsis max-h-[100px] line-clamp-4'>{jobdetails.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-3/4 p-[16px] flex flex-col space-y-4 '>
                            {/* Second div, 80% width */}
                            <h1 className='text-2xl font-semibold'>Your Application</h1>
                            <p className='noto-sans-normal'>Enter your required details to <span className='text-blue-400'>Apply</span></p>
                            <div className='flex flex-col space-y-4'>
                                {/* Full Name */}
                                <div className='flex flex-col space-y-2'>
                                    <h1>Full Name:</h1>
                                    <input className='w-full dark:bg-[#333] p-[8px] border-gray-200 border-2 rounded-xl' placeholder='Mike Kai' value={addUserDetails.username}></input>
                                </div>
                                {/* Email */}
                                <div className='flex flex-col space-y-2'>
                                    <h1>Email:</h1>
                                    <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='kai@gmail.com' value={userDetials.email}></input>
                                </div>
                                {/* Phone Number & Age */}
                                <div className='flex space-x-4'>
                                    <div className='w-1/2 space-y-2'>
                                        <h1>Age:</h1>
                                        <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='20' value={addUserDetails.age}></input>
                                    </div>
                                    <div className='w-1/2 space-y-2'>
                                        <h1>Phone Number:</h1>
                                        <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='845712356' value={addUserDetails.contact}></input>
                                    </div>
                                </div>
                                {/* Degree & College */}
                                <div className='flex space-x-4'>
                                    <div className='w-1/2 space-y-2'>
                                        <h1>Degree:</h1>
                                        <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='B.E' value={addUserDetails.degree}></input>
                                    </div>
                                    <div className='w-1/2 space-y-2'>
                                        <h1>College:</h1>
                                        <input className='w-full dark:bg-[#333]  p-[8px] border-gray-200 border-2 rounded-xl' placeholder='Sri Eshwar College of Engineering' value={addUserDetails.college}></input>
                                    </div>
                                </div>
                                {/* Dev job roles */}
                                <div>
                                    <h1>Developer Job Roles:</h1>
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        {
                                            addUserDetails.role.map((skill, key) => {
                                                return (
                                                    <Tag key={key} skill={skill} skillColors={skillColors} />
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                {/* Skill Match Rate */}
                                <div>
                                    <h1>EffScore:</h1>
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        {
                                            calculateSkillMatchRate(addUserDetails.role, jobdetails.skillsRequired).matchRate
                                        }%
                                    </div>
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                    <div className='flex flex-row flex-wrap gap-2 mt-2'>
                                    <h1>Missing Skills</h1>
                                        {
                                            calculateSkillMatchRate(addUserDetails.role, jobdetails.skillsRequired).missingSkills.map((skill, key) => {
                                                return (
                                                    <Tag key={key} skill={skill} skillColors={skillColors} />
                                                );
                                            })
                                        }
                                        </div>
                                        <div className='flex flex-wrap gap-2 mt-2'>
                                        <h1>Matching Skills</h1>
                                            {
                                                calculateSkillMatchRate(addUserDetails.role, jobdetails.skillsRequired).matchingSkills.map((skill, key) => {
                                                    return (
                                                        <Tag key={key} skill={skill} skillColors={skillColors} />
                                                    );
                                                })
                                            }
                                            </div>
                                            </div>
                                </div>
                                {/* Resume */}
                                <div className='space-y-2'>
                                    <h1>Effitrack Real Time Resume:</h1>
                                    <Link to={`http://localhost:3000/usernameSearch/${userDetials.username}`} className='h-[100px] rounded border-2 border-dotted border-blue-500 flex justify-center items-center'>
                                        <div className='flex space-x-2 text-blue-500 '>
                                            <h1 to={''} className='underline'>View</h1>
                                            <span className="material-icons-sharp">
                                                rocket_launch
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                               {/* Submit Application */}

                               <div className='flex justify-center'>
                                      <button className='bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded hover:bg-gray-600' onClick={handleApply}>Submit Application</button>
                               </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>

        </>
    );
};



export default JobPopUp;