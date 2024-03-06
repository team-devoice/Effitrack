import React from 'react'
import tw from 'tailwind-styled-components';
import { useState } from 'react';

const SearchBarContainer = tw.div`
  w-full
  max-w-xs
  rounded-md
  shadow-sm
  border-gray-300
  focus:border-indigo-500
  focus:ring-indigo-500
  sm:max-w-xs
  relative
`;

const SearchBarInput = tw.input`
  block
  w-full
  pl-3
  py-2
  border-gray-300
  rounded-md
  focus:outline-none
  focus:ring-indigo-500
  focus:border-indigo-500
  sm:text-sm
`;

const SearchBar = (props) => {
    const {filterrole,setFilterRole} = props;
    const [inputValue,setInputValue] = useState('')
    
    function handleAdd(e){
      if(e.key === 'Enter' && inputValue.trim()){
        setFilterRole([...filterrole, inputValue]); 
        console.log(filterrole)// Add input using spread syntax
        setInputValue(''); 
      }
  }

  function handleDelete(index){
      const newArray = filterrole.filter((domain,i)=>{
          return i !== index
      })
      setFilterRole(newArray);
  }

    return (
      <SearchBarContainer className='flex h-10 justify-center items-center p-2 dark:bg-[#333] shadow-md'>
        <span className="material-icons-sharp dark:text-white">search</span>
        <SearchBarInput
          type="text" 
          name="search"
          placeholder="Search..."
          value={inputValue}
          onChange={(event)=>{setInputValue(event.target.value)}}
          className=' bg-[#fafafa] dark:text-white dark:bg-[#333]'
          onKeyDown={handleAdd}
        />
          <div className='flex flex-row gap-x-4 flex-wrap'>
                    {filterrole && filterrole.map((item, index) => (
                        <div className='px-4 py-2 rounded-xl bg-[#fafafa] flex flex-row gap-x-2 items-center'>   
                            <button key={index} className='' >{item}</button>
                            <button className='' onClick={()=>handleDelete(index)}><span class="material-icons-sharp">cancel</span></button>
                        </div>
                        

                    ))}
          </div>
      </SearchBarContainer>
    );
  };

  const DropdownList = (props) =>{
    return(
      <div className="">
        <select className='bg-white shadow-md dark:bg-[#333] dark:text-white h-full rounded-md px-1' onChange={(e)=>{props.setFilterValue(e.target.value)}}>
            <option value={"Leetcode"} className='p-2'>Leetcode</option>
            <option value={"Codechef"} className='p-2'>Codechef</option>
            <option value={"Codeforces"} className='p-2'>Codeforces</option>
            <option value={"Github"} className='p-2'>Github</option>
        </select>
      </div>
    );
  }

const TopThree = (props) => {
    return (
        <div className='w-[20rem] h-[25rem] bg-white dark:bg-[#333] dark:text-[#f3f3f3] rounded-lg flex flex-col gap-y-4 justify-between items-stretch shadow-lg hover:shadow-sm'>
          <div className='p-4 text-lg'>
            {props.position}th
          </div>
          <div className='flex flex-col justify-center items-center'>
              <div>
                <img src="https://i.ibb.co/C6tQgGh/image.png" alt="profile" className='h-[8rem] w-[8rem] rounded-full'/>
              </div>
              <div className='text-xl font-semibold mt-4'>
                {props.username}
              </div>
              <div className=' bg-[#34E4B5] dark:bg-[#1c1d1c] m-4 p-2 rounded-lg'>
                badge name
              </div>
            </div>
          <div>
          <div className='flex justify-around mb-2'>
            <div className='flex gap-3'>
              <div>
                <img src="https://i.ibb.co/CJmPYDz/image.png" alt="lt_logo" border="0" className='h-5 w-5' /> 
              </div>
              <div>--</div>
            </div>
            <div className='flex gap-3'>
              <div>
                <img src="https://i.ibb.co/WgX9tJf/image.png" alt="cc_logo" border="0" className='h-5 w-5 rounded-full'/>
              </div>
              <div>--</div>
            </div>
            <div className='flex gap-3'>
              <div>
                <img src="https://i.ibb.co/8Df4ZJZ/image.png" alt="cf_logo" border="0" className='h-5 w-5' />
              </div>
              <div>--</div>
            </div>
          </div>
        </div>
      </div>
    );
}

const UsersList = (props) => {
  return (
      <div className=' sm:max-w-[62rem] w-full h-[60px] bg-white dark:bg-[#333] rounded-lg flex items-center justify-between px-6 dark:text-[#f3f3f3] shadow-md hover:shadow-sm'>
        <div className='flex gap-2 sm:gap-8 items-center'>
          <div className='pl-2 sm:pl-4'>
            {props.position}th
          </div>
          <div>
            <img src="https://i.ibb.co/C6tQgGh/image.png" alt="profile" className='h-11 w-11 rounded-full'/>
          </div>
          <div>{props.name}</div>
        </div>
        <div>Rank</div>
        <div>Effitrack Score</div>
        <div>{'>'} </div>
      </div>
  );
}
  
  export  {SearchBar, DropdownList, TopThree, UsersList};