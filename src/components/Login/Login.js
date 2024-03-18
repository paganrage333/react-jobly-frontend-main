import AuthForm from "../AuthForm/AuthForm";
import JoblyApi from "../../helpers/JoblyApi";

const Login = () =>{
    const formAttr = [
            {
                label: "Username",
                name:  "username",
                initVal: "",
            },{
                label: "Password",
                name:  "password",
                initVal: "",
                type: "password",
            },
        ]

        // Login
        const submitAction = async(data) => await JoblyApi.login(data)

    return(
        <>
            <AuthForm 
                formTitle="Login"
                formAttr={formAttr}
                submitAction={submitAction}
            />
        </>
    )
}

export default Login;
