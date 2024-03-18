import { Routes, Route, Navigate} from 'react-router-dom';
import Home from "../Home/Home"
import SearchList from "../SearchList/SearchList"
import Profile from "../Profile/Profile"
import JobCard from "../JobCard/JobCard";
import CompanyCard from "../CompanyCard/CompanyCard";
import CompanyJobs from "../CompanyJobs/CompanyJobs";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import JoblyApi from '../../helpers/JoblyApi';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

const RouteList = () =>{

  const {user} = useContext(UserContext)

  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])


  useEffect(()=>{
    async function getCompanyList(){
      let res = await JoblyApi.getAllCompanies();
      setCompanies(res)
    }
    
    async function getJobList(){
      let allJobs = await JoblyApi.getAllJobs();
      let applied;
      if(user){
        let u = await JoblyApi.getUserData(user)
        applied = u.applications
      }
      setJobs(allJobs)
    }
    getCompanyList();
    getJobList();
  },[])

  return(
      <Routes>
        <Route
          path="/"
          element={ <Home /> }
        />
        
        {/* ONLY if user is logged in */}
        {user ? 
          <>
            <Route
              path="/jobs"
              element={
                <SearchList
                  ComponentType={ JobCard }
                  listData={ jobs }
                  searchType={"title"}
                />}
            />
            
            <Route
              path="/companies"
              element={
                <SearchList
                  ComponentType={ CompanyCard }
                  listData={ companies }
                  searchType={"name"}
                />}
            />
            
            <Route
              path="/companies/:handle"
              element={<CompanyJobs />}
            />
            
            <Route
              path="/profile"
              element={<Profile />}
            />
          </>
          : //If no user
          <>
            <Route
              path="/login"
              element={ <Login /> }
            />
            
            <Route
              path="/signup"
              element={ <SignUp /> }
            />
              </>
        }
        {/* Catch all route */}
        <Route 
          path="*"
          element={ <Navigate to="/" replace={true} /> }
        />
      </Routes>
  )
}

export default RouteList;