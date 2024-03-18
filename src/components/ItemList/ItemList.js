import React, { useEffect, useState } from "react";
import "./ItemList.css"

const ItemList = ({ComponentType, listData, searchData="", searchTarget}) =>{

    const [filterData, setFilterData] = useState(listData)

    // Search updated
    useEffect(()=>{
        if(searchTarget && searchData.length > 0){
            const fData = listData.filter(item=>{
                const termTarget = item[`${searchTarget}`].toLowerCase()
                const itemFilter = searchData.toLowerCase()
                if(termTarget.includes(itemFilter)){
                    return item;
                }
            })
            setFilterData(fData)
        }else{
            setFilterData(listData)
        }
    },[searchData, listData]);

    return(
        <div className="ItemList">
            { !filterData ? ""
                :filterData.length === 0 ?
                    <h2 className="no-results">Sorry, no results were found!</h2>
                    :filterData.map((itemData, idx)=>
                        <ComponentType
                            key={`${ComponentType.name}-${idx}`}
                            data={itemData}
                        />)
            }
        </div>
    )
}

export default ItemList;