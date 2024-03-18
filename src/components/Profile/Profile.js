import React, { useContext, useEffect, useState } from "react";
import JoblyApi from '../../helpers/JoblyApi';
import "./Profile.css"
import UserContext from "../../context/UserContext";

const Profile = () =>{
    const INIT_FORMDATA = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: false,
    }

    // // Initialize state variables for form inputs
    const [formData, setFormData] = useState(INIT_FORMDATA);
    const [showMsg, setShowMsg] = useState(false);

    const {user} = useContext(UserContext)

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await JoblyApi.updateUserData(user, formData)
        setShowMsg(true)
    }
    useEffect(()=>{
        async function getUserProfile(){
            const res = await JoblyApi.getUserData(user)
            delete res.applications
            setFormData(res)
        }
        getUserProfile()
    },[])
    
    return(
        <div className="form-wrapper">
          <h2>Profile</h2>
          <form className="Profile-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    placeholder={formData.username}
                    type="text"
                    id="username"
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>
            {showMsg && 
                <p className="form-success">
                    Updated Successfully!
                </p>
            }
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
    )
}

export default Profile;
