import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import "./SearchList.css"
import UserContext from "../../context/UserContext";

const SearchList = ({ComponentType, listData, searchType}) =>{
    
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    // When chaning between routes w/ same component but different childComponent
    useEffect(()=>{
        setIsLoading(true);
        setSearchTerm("")
        setTimeout(()=>{
            setIsLoading(false);
        }, 200)
    },[ComponentType])

    return(
        <>
            {isLoading ?
                <h1>Loading...</h1>
            :
            <div className="SearchList">
                <input
                    className="searchbar"
                    type="text"
                    name="search"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Enter search term..."
                />
                <div>
                    <ItemList
                        ComponentType={ComponentType}
                        listData={listData}
                        searchData={searchTerm}
                        searchTarget={searchType}
                    />
                </div>
            </div>
            }
        </>
    )
}

export default SearchList;