import AuthForm from "../AuthForm/AuthForm";
import JoblyApi from "../../helpers/JoblyApi";

const SignUp = () =>{
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
            },{
                label: "First Name",
                name:  "firstName",
                initVal: "",
            },{
                label: "Last Name",
                name:  "lastName",
                initVal: "",
            },{
                label: "Email",
                name: "email", 
                initVal: "",
                type: "email",
            },
        ]

        // Signup
        const submitAction = async(data) =>{
            let res = await JoblyApi.signUp(data)
            if(res.message){
                const labels = {};
                    for (const field of formAttr) {
                        labels[field.name] = field.label;
                    }
                formatErrMsg(res.message, labels)
            }
            return res
        }
        
        // Format Err Messages
        // "instance.KEY ..." => "LABEL ..."
        function formatErrMsg(msg, labels){
                for(let i=0; i < msg.length; i++){
                    for(const key in labels){
                        if(msg[i].includes(`instance.${key}`)){
                            msg[i] = msg[i].replace(`instance.${key}`, labels[key])
                            break; // stop searching when found
                        }
                    }
                }
        }
    return(
        <>
            <AuthForm 
                formTitle="Sign Up"
                formAttr={formAttr}
                submitAction={submitAction}
            />
        </>
    )
}

export default SignUp;
