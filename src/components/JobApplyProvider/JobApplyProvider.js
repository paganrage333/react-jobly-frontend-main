import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "../../helpers/JoblyApi";
import UserContext from "../../context/UserContext";
import JobApplyContext from "../../context/JobApplyContext"



const JobApplyProvider = ({children}) =>{

    const {user} = useContext(UserContext)

    const [appliedJobs, setAppliedJobs] = useState([])

    const getUserJobApps = async()=>{
        let jobs = await JoblyApi.getAppliedJobIDs(user)
        setAppliedJobs(jobs)
    }

    const addJobApp = async (newAppID) => {
        let res = await JoblyApi.applyToJob(user, newAppID)
        if(res === newAppID){
            setAppliedJobs(prevData =>(
                [...prevData, newAppID]
            ))
        }
    };
    
    useEffect(()=>{
      if(user){
        getUserJobApps()
      }
    },[user])
    
    return(
        <JobApplyContext.Provider value={{ appliedJobs, getUserJobApps, addJobApp }}>
            { children }
        </JobApplyContext.Provider>
    )
}

export default JobApplyProvider;