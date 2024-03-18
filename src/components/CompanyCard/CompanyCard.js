import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css"

const CompnayCard = ({data}) =>{
    const {name, description, handle, logoUrl, numEmployees} = data;
    return(
        <div className="CompanyCard">
            <Link to={`/companies/${handle}`}>
                <p><b>{name}</b></p>
                <p>{description}</p>
                <p className="company-size">
                    <b>Comapny Size</b>: {numEmployees}employees
                </p>
            </Link>
        </div>
    )
}

export default CompnayCard;