import { useState } from 'react';
import './organizations.css'
import Platforms from './Platforms';
import User_all from './User_all';
import login from "../../assets/login.png";
const Organization = () =>{
    const [changeSettings,setChangeSettings] = useState(0);
    return(
        <>
            <section className="settings-container">
                <div>
                    <div className='settings-profile-div'>
                        <div>
                            <img src='https://avatars.githubusercontent.com/u/121782238?v=4'></img>
                        </div>
                    </div>
                    <div className='switch-settings'>
                        <div className='setting-profile-but'>
                            <button onClick={()=>setChangeSettings(0)}>Profile</button>
                        </div>  
                        <div className='setting-organization-but'>
                            <button onClick={()=>setChangeSettings(1)}>Platforms</button>
                        </div>
                    </div>
                    <div className='each-page-details'>

                    {
                        (changeSettings === 0 ) ?   <User_all/> :
                        (changeSettings === 1 ) ? <Platforms/> :
                        <></>
                    }
                    </div>
                </div>
            </section>
        </>
    )
}


export default Organization;