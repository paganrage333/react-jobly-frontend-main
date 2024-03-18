import React, { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import NavBar from "../NavBar/NavBar";
import RouteList from "../RouteList/RouteList";
import JobApplyProvider from "../JobApplyProvider/JobApplyProvider";

const UserProvider = () =>{

    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    const updateUser = () => {
      try{
        const token = localStorage.getItem(`_token`)
        const { username } = jwtDecode(token)
        setUser(username)
      }catch(err){
        // Authentication to routes that require
        // authentication will be handled by backend
        setUser(undefined) // Bad/no token = Invalid user; Log out
        navigate("/") //After logout, redirect to "/"
      }
    };
    
    useEffect(()=>{
      if(!user){
        updateUser()
      }
      setIsLoading(false)
    },[user])
    
    return(
        <UserContext.Provider value={{ user, updateUser }}>
          <NavBar />
        {isLoading ? <h1>LOADING...</h1> :
          <JobApplyProvider
            children={ <RouteList /> }
          />
        }
        </UserContext.Provider>
    )
}

export default UserProvider;