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

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearchInput = (event) => {
      setSearchQuery(event.target.value);
    };
  
    return (
      <SearchBarContainer className='flex h-10 justify-center items-center bg-white p-2'>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2Zu24TQRSGPxeElgYbEVIYHoECCJdXQAIH+YKECA+AxEVESAl0wAsgUUEKpCiiIDFKDYGGS96AhhZSBZGQ2MFwpH+lKQxi8czYu+wnjbTy5f/3jPecOTOGgoKR5AAwDcwDa8A6sKPxBfig9y4DFUaQM0Ab6AC9vxz22WXgNCPAEWDFubku8Aq4BhwDysAeDbs+DlwHVvXZ5HsvgMPDCqIFfNWNfAPuAftTfN8Cuw9sSmMDaBCZOWc2F4DxAbQOAYuO3iyRuCvDH7ouedK9CuzGCqYlIzOsBdCfcoKpEzCxk5y4FcoEmHFyphrCYMXJiZCUnJxph1gneqowE4RnXJWwB5zyKdyWqJXYWFhpNs8ln21HRwtYmnViUGyd6aq9seuBuaKZeUl8Xsv7kg+xeYlZ2xGbG/J+7ENsTWLWO8VmUt7vfIitSyxmfiRU5P3Zh9i2xMaIz155f89LIBt5ebQ++kx22xTF5qS8rQznovw+8iE2LTHbnsbmjbzP+XpOkxbFS6uQskXpAPt8iS5rZqyRi8UDeVpL740TEt0aQht/1Ld425khX/v0fpj2M3k9D2FQ1cLU03Y0FLflYSeTB0OZNJzDBzso8M0F5/DhLIGZdYKZ8fSYlfRLJEHs6sSGWMEkOWOHbP/KhJMT7rDS2yQCdSdnNlWa06wzZZXYLacx7PYJpkEEqk41S4xX1VpMajEd06jotZvqndybXlBiN4cZDDqyWUr5t4JtD572aUZ/F0ydiJR1UPAEeK8Suq3F7RPwFniom/rTtqAxCsH4wsp7p08wF8lRMC0yyFSegqn9D8E0yWgwO0UwGSkAc2SU885jdoeMU4v5d3ZBwa8Z+Ak4rhMJLuUtjQAAAABJRU5ErkJggg==" alt='search' className='w-7 h-7'></img>
        <SearchBarInput
          type="text"
          name="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </SearchBarContainer>
    );
  };

  const DropdownList = () =>{
    return(
      <div className="">
        <select className='bg-white h-full rounded-md px-1'>
            <option value={"user"} className='p-2'>User</option>
            <option value={"organization"} className='p-2'>organization</option>
        </select>
      </div>
    );
  }

const TopThree = (props) => {
    return (
        <div className='w-[20rem] h-[25rem] bg-white dark:bg-[#1c1d1c] dark:text-[#f3f3f3] rounded-lg flex flex-col gap-y-4 justify-between items-stretch shadow-lg hover:shadow-sm'>
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
              <div className='text-md'>
                muruga
              </div>
              <div className=' bg-[#34E4B5] dark:bg-[#333] m-4 p-2 rounded-lg'>
                badge name
              </div>
            </div>
          <div>
          <div className='flex justify-around mb-2'>
            <div className='flex gap-3'>
              <div>
                <img src="https://i.ibb.co/CJmPYDz/image.png" alt="lt_logo" border="0" className='h-5 w-5' /> 
              </div>
              <div>123</div>
            </div>
            <div className='flex gap-3'>
              <div>
                <img src="https://i.ibb.co/WgX9tJf/image.png" alt="cc_logo" border="0" className='h-5 w-5 rounded-full'/>
              </div>
              <div>123</div>
            </div>
            <div className='flex gap-3'>
              <div>
                <img src="https://i.ibb.co/8Df4ZJZ/image.png" alt="cf_logo" border="0" className='h-5 w-5' />
              </div>
              <div>123</div>
            </div>
          </div>
        </div>
      </div>
    );
}

const UsersList = (props) => {
  return (
      <div className=' sm:max-w-[62rem] w-full h-[60px] bg-white dark:bg-[#1c1d1c] rounded-lg flex items-center justify-between px-6 dark:text-[#f3f3f3] shadow-md hover:shadow-sm'>
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
        <div>></div>
      </div>
  );
}
  
  export  {SearchBar, DropdownList, TopThree, UsersList};