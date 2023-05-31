import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginForm = ({setCurrentUser}) => {

    //form info stored in state variables 
    const [formInfo, setFormInfo] = useState({
        email: "",
        password: ""
        })

    let [formErrors, setFormErrors] = useState("")
    const navigate = useNavigate();
    
    const changeHandler = (e)=> {
        console.log("changing the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
        console.log("THE FORM INFO STATE VARIABLE: ", formInfo)
    }

    const login = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("response when logging in!", res)
                if(res.data.error){
                    setFormErrors(res.data.error)
                }else{
                    navigate("/pizza-time/dashboard");
                    window.location.reload();
    
                }
            })
            .catch(err=>console.log("err when logging in: ", err))
    }

    return (
        <div>
            <h3>Login</h3> 
            <form onSubmit={login}>
                <div className="form-group">
                <p className="text-danger">{formErrors}</p>
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id="" className = 'form-control' onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" className = 'form-control' onChange={changeHandler} />
                </div>
                
                <input type="submit" value="Login" className="btn btn-primary mt-3" />
            </form>
        </div>
    );
};

export default LoginForm;