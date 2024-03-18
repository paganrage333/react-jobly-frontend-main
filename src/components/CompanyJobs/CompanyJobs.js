import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoblyApi from "../../helpers/JoblyApi";
import JobCard from "../JobCard/JobCard";
import "./CompanyJobs.css"
import ItemList from "../ItemList/ItemList";

const CompanyJobs = () =>{
    
    const [companyData, setCompanyData] = useState({})
    const { handle } = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
        async function getData(){
            try{
                let res = await JoblyApi.getCompany(handle)
                setCompanyData(res);
            }catch(err){
                console.error("Error fetching data:", err);
                if(err.status === 404){
                    navigate("/companies")
                }
            }
        }
        getData()
    },[handle])

    return(
        <>
            <div className="company-info">
                <h2>{companyData.name}</h2>
                <p>{companyData.description}</p>
            </div>
            <div className="CompanyJobs">
                <ItemList
                    ComponentType={JobCard}
                    listData={companyData.jobs}
                />
            </div>
        </>
    )
}

export default CompanyJobs;