import React from 'react'

const JobCard = (props) => {
    const {jobdetails, skillColors} = props
  return (
    <div className='border border-[#c0c0c0] dark:border-0 mb-4 rounded-xl p-4 bg-[#f3f4f5] dark:bg-[#171717] dark:text-[#f3f3f3]'>
        <div className='flex gap-4'>
            <div className='flex flex-col sm:flex-row justify-between w-full'>
                <div className='flex gap-4'>
                    <img src={jobdetails.logo} alt='company logo' className='h-[50px] w-[50px] rounded-full'/>
                    <div className='flex-col'>
                        <div className=''>{jobdetails.companyName}</div>
                        <div>location : {jobdetails.location}</div>
                    </div>
                </div>
                <div className='hidden sm:flex flex-col items-end'>
                    <div>{jobdetails.role}</div>
                    <div className=' bg-green-600 px-2 py-1 mt-1 rounded-lg w-[80px] text-center'>{jobdetails.workType}</div>
                </div>
            </div>
        </div>
        <div className='noto-sans-normal'>
            Employement Type : {jobdetails.workType}
        </div>
        <div className='flex gap-2 mt-4 sm:mt-4'>
            {
                jobdetails.skillsRequired.map((skill, key) => {
                    return (
                        <div key={key} className={`inline-block px-2 py-1 bg-[#f3f4f5] dark:bg-[#333] text-xs rounded-lg border whitespace-nowrap overflow-x-hidden`} style={{ borderColor: skillColors[skill] }}>
                            {skill}
                        </div>
                    );
                })
            }
        </div>
        <div className='my-4 noto-sans-normal'>
            {jobdetails.description}
        </div>
        <div className='flex justify-between items-center'>
            <div>{jobdetails.salary}</div>
            <button className='px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-100'>Apply</button>
        </div>
    </div>
  )
}

export default JobCard