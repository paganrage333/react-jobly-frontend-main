import React, { useContext } from "react";
import { commaWholeNum } from "../../helpers/numberFormatting";
import "./JobCard.css"
import JobApplyContext from "../../context/JobApplyContext";

const JobCard = ({data}) =>{
    const {title, companyName, salary, equity, id}= data

    const {appliedJobs, addJobApp} = useContext(JobApplyContext)

    const handleApply = async() =>{
        await addJobApp(id)
    }


    return(
        <div className="JobCard">
            <p><b>{title}</b></p>
            {companyName ?
                <p>{companyName}</p>
                : "" 
            }
            <div className="job-details">
                <p><b>Salary</b>: {commaWholeNum(salary) || "N/A"}</p>
                <p><b>Equity</b>: {equity || "N/A"}</p>
            </div>
            <p><b>ID</b>: {id}</p>
            <div className="job-apply">
                {appliedJobs.includes(id) ?
                <button  className="applied" disabled>APPLIED</button>
                :<button className="not-applied"onClick={handleApply}>APPLY</button>
                }
            </div>
        </div>
    )
}
export default JobCard;