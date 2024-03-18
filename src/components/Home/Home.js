import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./Home.css"
import { Link } from "react-router-dom";

const Home = () =>{
    const {user} = useContext(UserContext)

    return(
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            {user ?
                <h2>Welcome Back, {user}</h2>
                :
                <div>
                    <Link to="/login"><button>Log in</button></Link>
                    <Link to="/signup"><button>Sign up</button></Link>
                </div>
            }
        </div>
    )
}

export default Home;