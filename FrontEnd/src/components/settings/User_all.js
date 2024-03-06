import './organizations.css'
import {useEffect, useState} from 'react'
import {useSelector , useReducer, useDispatch} from 'react-redux'
import collegeData from './colleges.json'
import axios from 'axios'
import { getCookie } from '../../services/servicehelp'
import { useAsyncError, useNavigate, useNavigation } from 'react-router-dom'
import { changeAddUserDetails } from '../../redux/userSlice'

export const InputBox = (props) =>{
    const {purpose,setPurpose,describe,data,resFun}  = props;
    return(
        <>
        {
            (purpose === 0 || describe === 'username' || describe === 'email') ?
            <>      
                <div className='platform-usernames-col'>
                    <label for={describe}>{describe}</label>
                    <input placeholder={describe} id={describe} value={data} readOnly></input>
                </div>
            </>
            :
            <>
                <div className='platform-usernames-col'>
                    <label for={describe}>{describe}</label>
                    <input placeholder={describe} id={describe} value={data} onChange={(e)=>resFun(e.target.value)} required></input>
                </div>
            </>
        }
            
        </>
    )
}

const AllStates = (props) =>{
    const {stateall,setAllstate,purpose,setUserstate,setUsercollege,userState} = props;

    return(
        <>
            <div className='platform-usernames-col'>
                <label for={'state'}>State</label>
                <select name="state" id="state" className="form-control" onChange={(e)=>{
                    setAllstate(e.target.value)
                    if(e.target.value !== 'select your state'){
                        setUserstate(e.target.value)
                    }else{
                        setUserstate('')
                        setUsercollege('')
                    }
                    }}>
                    
            {
                (purpose === 0) ?
                <>
                    {
                        (userState === '') ? <option value="select your state">Select your state</option>
                        :
                        <option value={userState}>{userState}</option>
                    }
                </>
                :
                <>
                        <option value="select your state">Select your state</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                </>
            }
            </select>
            </div>
        </>
    )
}


const AllCollege =(props) =>{
    const {colleges,setColleges,purpose, setUsercollege , userCollege} = props;
    return(
        <>  
        {
            (purpose === 0) ?
            <>
                <div className='platform-usernames-col'>
                    <label for='college'>College</label>
                    <select name='college' id='college' onChange={(e)=>{
                        if(e.target.value !== 'select your college'){
                            setUsercollege(e.target.value)
                        }else{
                            setUsercollege('')
                        }
                    }}>
                        {
                            (userCollege === '') ?  <option value={'select your college'}>select your college</option>
                                :
                                <option value={userCollege}>{userCollege}</option>
                        }
                        
                    </select>
                </div>
            </>
            :
            <>
                <div className='platform-usernames-col'>
                    <label for='college'>College</label>
                    <select name='college' id='college' onChange={(e)=>{
                        if(e.target.value !== 'select your college'){
                            setUsercollege(e.target.value)
                        }else{
                            setUsercollege('')
                        }
                    }}>
                    <option value={'select your college'}>select your college</option>
                        {
                            colleges && colleges.map((c)=>{
                                const college_name = c.college.split('(').at(0)
                                return (<>
                                    <option value={college_name}>{college_name}</option>
                                </>)
                            })
                        }
                    </select>
                </div>
            </>
        }
            
        </>
    )
}

const YearofStudy = (props) =>{
    const {years, describe ,purpose , setYear ,userYear} = props;
    return(
        <>
        {
            (purpose === 0) ?
            <>
                <div className='platform-usernames-col'>
                    <label for={describe}>{describe}</label>
                    <select name={describe} id={describe}>
                        {
                            (userYear === '') ? <option value={describe}>{describe}</option>
                            :
                            <option value={userYear}>{userYear}</option>
                        }

                    </select>
                </div>
            </>

            :
            <>  
                <div className='platform-usernames-col'>
                    <label for={describe}>{describe}</label>
                    <select name={describe} id={describe} onChange={(e)=>{
                        if(e.target.value !== describe){
                            setYear(e.target.value)
                        }else{
                            setYear('')
                        }
                    }}>
                        <option value={describe}>{describe}</option>
                        {
                            years && years.map((y) => {
                                return <>
                                    <option value={y}>{y}</option>
                                </>
                            })
                        }
                    </select>
                </div>
            </>
        }
            
        </>
    )
}

const DegreeofStudy = (props) =>{
    const {purpose,describe,degrees,setUserdegree,userdegree} = props;
    return(
        <>
        {
            purpose === 0 ?
            <>
                <div className='platform-usernames-col'>
                    <label for={describe}>{describe}</label>
                    <select name={describe} id={describe}>
                        {
                         (userdegree === '') ?  <option value={describe}>{describe}</option>
                          :
                          <option value={userdegree}>{userdegree}</option>
                        }
                    </select>
                </div>    
            </>
            :
            <>
                <div className='platform-usernames-col'>
                    <label for={describe}>{describe}</label>
                    <select name={describe} id={describe} onChange={(e)=>{
                        if(e.target.value !== describe){
                            setUserdegree(e.target.value);
                        }else{
                            setUserdegree('')
                        }
                    }}>
                         <option value={describe}>{describe}</option>
    
                        {
                            degrees && degrees.map((d) => {
                                return <>
                                    <option value={d}>{d}</option>
                                </>
                            })
                        }
                    </select>
                </div>    
            </>
        }    
        </>
    )
}

export const EnterData = (props) =>{
    const {purpose,describe,data,domains,setDomain} = props;
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(e){
        setInputValue(e.target.value)
    }

    function handleAdd(e){
        if(e.key === 'Enter' && inputValue.trim()){
            setDomain([...domains, inputValue]); // Add input using spread syntax
            setInputValue(''); 
        }
    }

    function handleDelete(index){
        const newArray = domains.filter((domain,i)=>{
            return i !== index
        })
        setDomain(newArray);
    }
    
    return(
        <>
            <div className='platform-usernames-col'>
                <label for={describe}>{describe}</label>
                <input id='domainenter' type='text' onChange={handleInputChange} value={inputValue} placeholder='enter your domains' onKeyDown={handleAdd}></input>
                <div className='flex flex-row gap-x-4 flex-wrap'>
                    {domains && domains.map((item, index) => (
                        <div className='px-4 py-2 rounded-xl bg-[#fafafa] flex flex-row gap-x-2 items-center'>   
                            <button key={index} className='' >{item}</button>
                            <button className='' onClick={()=>handleDelete(index)}><span class="material-icons-sharp">cancel</span></button>
                        </div>
                        

                    ))}
                </div>
            </div>
           
        </> 
    )
}

const AddProject = (props) =>{
    const navigate = useNavigate()
    const {project,setProject} = props;
    const [protitle, setProtitle] = useState('');
    const [proUrl,setProurl] = useState('');
    const [proDesc , setProDesc]  = useState('')
    const [domains,setDomain] = useState([]);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const authToken = getCookie(process.env.REACT_APP_JWT_NAME)
            if(!authToken){
                navigate('/login')
            }
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/additional/projects`,{
                proj_name:protitle,
                link:proUrl,
                description:proDesc,
                stack:domains
            },
            {
                headers:{
                    common:{
                        Authorization:`Bearer ${authToken}`
                    }
                }
            })

            setProject(0);
        } catch(e){
            console.log(e)
        }
    }

    return(
        <>
            <div className='project-data-col'>
                <div className={'flex flex-col gap-y-4'}>
                    <InputBox purpose={project} describe='Project name' data={protitle} resFun={setProtitle}/>
                    <InputBox purpose={project} describe='Live Link' data={proUrl} resFun={setProurl}/>
                    <InputBox purpose={project} describe='Project description' data={proDesc} resFun={setProDesc}/>
                    <EnterData purpose={project} describe ='domain' domains={domains} setDomain={setDomain}/>
                    {
                        (project===1) ? 
                        <div className='profile-save-edit'>
                            <button className='green-button' onClick={handleSubmit}>
                                Add Project
                            </button>
                            <button className='gray-button' onClick={()=>setProject(0)}>
                                cancel
                            </button>
                        </div>
                        :
                        <></>   
                    }
                </div>
            </div>
        </>
    )
}

const AddCert = (props) =>{
    const navigate = useNavigate()
    const {certification,setCertification} = props;
    const [certtitle, setCerttitle] = useState('');
    const [certUrl,setCerturl] = useState('');
    const [certDesc , setCertDesc]  = useState('')
    const [company,setCompany] = useState('');
    const dispatch = useDispatch()
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const authToken = getCookie(process.env.REACT_APP_JWT_NAME)
            if(!authToken){
                navigate('/login')
            }
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/additional/certificates`,{
                cert_name:certtitle,
                link:certUrl,
                description:certDesc,
                certification_provider:company
            },
            {
                headers:{
                    common:{
                        Authorization:`Bearer ${authToken}`
                    }
                }
            })
            
            setCertification(0);

        } catch(e){
            console.log(e)
        }
    }


    return(
        <>
            <div className='project-data-col'>
                <div className={'flex flex-col gap-y-4'}>
                    <InputBox purpose={certification} describe='Certification name' data={certtitle} resFun={setCerttitle}/>
                    <InputBox purpose={certification} describe='Live Link' data={certUrl} resFun={setCerturl}/>
                    <InputBox purpose={certification} describe='Organization' data={company} resFun={setCompany}/>
                    <InputBox purpose={certification} describe='Descriptions' data={certDesc} resFun={setCertDesc}/>
                
                    {
                        (certification===1) ? 
                        <div className='profile-save-edit'>
                            <button className='green-button' onClick={handleSubmit}>
                                Add Certificate
                            </button>
                            <button className='gray-button' onClick={()=>setCertification(0)}>
                                cancel
                            </button>
                        </div>
                        :
                        <></>   
                    }
                </div>
            </div>
        </>
    )
}

    const AddIntern = (props) =>{
        const navigate = useNavigate()
        const {intern,setIntern} = props;
        const [internproject, setInternproject] = useState('');
        const [internOrganization,setInternOrganization] = useState('');
        const [internRole , setInternRole]  = useState('')
        const [domains,setDomain] = useState([]);

        async function handleSubmit(e){
            e.preventDefault();
            try{
                const authToken = getCookie(process.env.REACT_APP_JWT_NAME)
                if(!authToken){
                    navigate('/login')
                }
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/additional/intern`,{
                    internproject,
                    internOrganization,
                    internRole,
                    domains
                },
                {
                    headers:{
                        common:{
                            Authorization:`Bearer ${authToken}`
                        }
                    }
                })
                setIntern(0);
            } catch(e){
                console.log(e)
            }
        }

        return(
            <>
                <div className='project-data-col'>
                    <div className={'flex flex-col gap-y-4'}>
                        <InputBox purpose={intern} describe='Intern Project Name' data={internproject} resFun={setInternproject}/>
                        <InputBox purpose={intern} describe='Company Name' data={internOrganization} resFun={setInternOrganization}/>
                        <InputBox purpose={intern} describe='Role' data={internRole} resFun={setInternRole}/>
                        <EnterData purpose={intern} describe ='domain' domains={domains} setDomain={setDomain}/>
                        {
                            (intern===1) ? 
                            <div className='profile-save-edit'>
                                <button className='green-button' onClick={handleSubmit}>
                                    Add Iterns
                                </button>
                                <button className='gray-button' onClick={()=>setIntern(0)}>
                                    cancel
                                </button>
                            </div>
                            :
                            <></>   
                        }
                    </div>
                </div>
            </>
        )
    }

const DisplayProject = () =>{

    // const userDetails = useSelector((store)=>store.userDetails);
    // const {userDetials} = userDetails;
    // const {addUserDetails} = userDetails
    // console.log(addUserDetails)
    return(
        <>
            <div className='project-data-col'>
                
            </div>
        </>
    )
}


const User_all = ()=>{
    const navigate = useNavigate()
    const [personal,setPersonal] = useState(0);
    const [education,setEducation] = useState(0);
    const userDetails = useSelector((store)=>store.userDetails);
    const {userDetials} = userDetails;
    const {addUserDetails} = userDetails
    const [stateall,setAllstate] = useState(addUserDetails.state)
    const [colleges,setColleges] = useState(addUserDetails.college);
    const [age,setAge] = useState(addUserDetails.age);
    const [contact,setContact] = useState(addUserDetails.contact);
    const [role,setRole] = useState(addUserDetails.role);
    const [startyear,setStartyear] = useState(addUserDetails.startyear);
    const [endyear,setEndyear] = useState(addUserDetails.endyear);
    const [userState,setUserstate] = useState(addUserDetails.state);
    const [userCollege,setUsercollege] = useState(addUserDetails.college);
    const [gender,setGender] = useState(addUserDetails.gender)  
    const [project,setProject]  = useState(0)
    const [certification,setCertification] = useState(0)
    const [intern,setIntern] = useState(0)
    const [years, setYears] = useState([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
        2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,'Others'])
    const [degrees,setDegrees]=useState(['B.E','B.Tech','M.E','M.Tech','Others']);
    const [userdegree,setUserdegree] = useState(addUserDetails.degree);
    useEffect(()=>{
        const modifyCollege = collegeData.filter((d)=>{
            return d.state === stateall
        })
        setColleges(modifyCollege)
    },[stateall])



    const changePersonal = async (e) =>{
        e.preventDefault();
        const authToken = await getCookie('jwtToken');
        if (!authToken) {
            navigate("/login");
        }
        try{
            const axiosInstance = axios.create({
                headers: {
                    common: {
                      Authorization: `Bearer ${authToken}`,
                    },
                },
            })
            const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/additional/personal`,
                {age,contact,role,gender}
            )
            // changeAddUserDetails(response.data.new)
            // setRole([])
            setPersonal(0);
        } catch(e){
            console.log(e.response)
        }
    }
    
    const changeEducation = async (e) =>{
        e.preventDefault();
        const authToken = await getCookie('jwtToken');
        if (!authToken) {
            navigate("/login");
        }
        try{
            const axiosInstance = axios.create({
                headers: {
                    common: {
                      Authorization: `Bearer ${authToken}`,
                    },
                },
            })
            const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/additional/education`,
            { startyear,endyear,state:userState,college:userCollege,degree:userdegree})
            changeAddUserDetails(response.data)
            setEducation(0);
        } catch(e){
            console.log(e.response)
        }
    }


    return(
        <>
            <div className='personal-details'>
                <h1 className='text-2xl font-semibold'>Profile</h1>
                <h4 className='text-lg text-gray-500 dark:text-gray-400'>Add your personal profile details</h4>
                <div >
                    <div className='platform-usernames-row'>
                        <InputBox purpose={personal} describe='username' data={userDetials.username}/>
                        <InputBox purpose={personal} setPurpose={setPersonal} describe='age' data={age} resFun={setAge}/>
                        <InputBox purpose={personal} describe={'email'} data={userDetials.email}/>
                        <InputBox purpose={personal} setPurpose={setPersonal}  describe='Contact' data={contact} resFun={setContact}/>
                        <EnterData describe='Dev role' domains={role} setDomain={setRole}/>
                        <InputBox purpose={personal} setPurpose={setPersonal}  describe='Gender' data={gender} resFun={setGender}/>
                    </div>
                    {
                        (personal === 1)?
                            <div className='profile-save-edit'>
                                <button className='green-button' onClick={(e)=>changePersonal(e)}>
                                    save
                                </button>
                                <button className='gray-button' onClick={()=>setPersonal(0)}>
                                    cancel
                                </button>
                            </div>   
                        :
                        <></>
                    }
                     
                </div>
                {
                    (personal === 0) ?  
                    <button className='edit-button'
                        onClick={()=>setPersonal(1)}
                    >Edit</button> 
                    : 
                    <></>
                }
                
            </div>
            <div className='organization-details'>
                <h1 className='text-2xl font-semibold'>Organization</h1>
                <h4 className='text-lg text-gray-500'>Add your organization profile details</h4>
                <form onSubmit={(e)=>changeEducation(e)}>
                    <div className='platform-usernames-row'>
                        <AllStates stateall={stateall} setAllstate={setAllstate} userState={userState} purpose={education} setUserstate={setUserstate} setUsercollege={setUsercollege}/>
                        <AllCollege colleges = {colleges} setColleges = {setColleges} userCollege={userCollege} purpose={education} setUsercollege={setUsercollege}/>
                        <YearofStudy years={years} describe='start year' userYear={startyear}  purpose={education} setYear={setStartyear}/>
                        <YearofStudy years={years} describe='end year' userYear={endyear} purpose={education} setYear = {setEndyear}/>
                        <DegreeofStudy  describe='degree' data={''} userdegree={userdegree} degrees={degrees} purpose={education} setUserdegree={setUserdegree} />
                    </div>
                {   (education===1) ? 
                    <div className='profile-save-edit'>
                        <button className='green-button'>
                            save
                        </button>
                        <button className='gray-button' onClick={()=>setEducation(0)}>
                            cancel
                        </button>
                    </div>
                    :
                    <></>
                }
                </form>
                {
                    (education === 0) ?
                    <>  
                        <button className='edit-button' onClick={()=>setEducation(1)}>Edit</button>
                    </>
                    :
                    <></>
                }
                

            </div>
            <div className='project-details'>
                <h1 className='text-2xl font-semibold'>Projects</h1>
              
                <div className=''>
                    {
                        project === 0 ?
                        <>  
                            <h4 className='text-lg text-gray-500'>Your Projects</h4>
                            <div className='project-data-row'>
                                <DisplayProject/>
                            </div>
                        </> 
                        :
                        <>   
                            <h4 className='text-lg text-gray-500'>Add your Projects</h4>
                            <AddProject project={project} setProject={setProject}/>
                        </>
                    }
                </div>
                {
                    (project === 0) ?
                    <>  
                        <button className='edit-button' onClick={()=>setProject(1)}>Add</button>
                    </>
                    :
                    <></>
                }
                

            </div>
            <div className='certification-details'>
                <h1 className='text-2xl font-semibold'>Certification</h1>
              
                <div className=''>
                    {
                        certification === 0 ?
                        <>  
                            <h4 className='text-lg text-gray-500'>Your Certifications</h4>
                            <div className='project-data-row'>
                                <DisplayProject/>
                            </div>
                        </> 
                        :
                        <>   
                            <h4 className='text-lg text-gray-500'>Add your Cerfiticate</h4>
                            <AddCert certification={certification} setCertification={setCertification}/>
                        </>
                    }
                </div>
                {
                    (certification === 0) ?
                    <>  
                        <button className='edit-button' onClick={()=>setCertification(1)}>Add</button>
                    </>
                    :
                    <></>
                }
                

            </div>
            <div className='intern-details'>
                <h1 className='text-2xl font-semibold'>Iternships</h1>
              
                <div className=''>
                    {
                        intern === 0 ?
                        <>  
                            <h4 className='text-lg text-gray-500'>Your Iterns</h4>
                            <div className='project-data-row'>
                                <DisplayProject/>
                            </div>
                        </> 
                        :
                        <>   
                            <h4 className='text-lg text-gray-500'>Add your Iterns</h4>
                            <AddIntern intern={intern} setIntern={setIntern}/>
                        </>
                    }
                </div>
                {
                    (intern === 0) ?
                    <>  
                        <button className='edit-button' onClick={()=>setIntern(1)}>Add</button>
                    </>
                    :
                    <></>
                }
                

            </div>
        </>
    )
}

export default User_all;