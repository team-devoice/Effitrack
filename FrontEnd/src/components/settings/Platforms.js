import { useState } from 'react';
import './organizations.css'
import { InputBox } from './User_all';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const Platforms = () =>{
    const [platform,setPlatform] = useState(0)
    const userDetails = useSelector((store)=>store.userDetails);
    const {userDetials} = userDetails;
    return(
        <>
            <div className='username-details'>
                <h1 className='text-2xl font-semibold'>Platforms</h1>
                <h4 className='text-lg text-gray-500'>Add your platforms username details</h4>
                <form>
                   
                    <div className='platform-usernames-row'>
                        <InputBox purpose={platform}  describe={'leetcode'} data={userDetials.leetcode} />
                        <InputBox purpose={platform}  describe={'codechef'} data={userDetials.codechef}/>
                        <InputBox purpose={platform}  describe={'codeforces'} data={userDetials.codeforces}/>
                        <InputBox purpose={platform}  describe={'github'} data={userDetials.github}/>
                    </div>
                </form>
                <Link className='edit-button' to='/validUsername'>Edit</Link>

            </div>
        </>

    )
}

export default Platforms;