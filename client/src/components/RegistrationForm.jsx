import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, redirect } from "react-router-dom";

const RegistrationForm = ({isMember, setIsMember}) => {

    //form info stored in state variables 
    const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    streetAddress: "",
    city: "",
    homeState: "",
    zipCode: ""
    })

    let [formErrors, setFormErrors] = useState({})

    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
    //         .then(res=>{
    //             console.log("cookie cleared", res)
    //         })
    //         .catch(err=>{
    //             console.log("errrr clearing userToken", err)
    //         })
    // }, []);

    const changeHandler = (e)=> {
        console.log("changing the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
        console.log("THE FORM INFO STATE VARIABLE: ", formInfo)
    }

    
    const register = (e)=>{
        e.preventDefault();

        console.log("we clicked the register button")
        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("res after registering", res)
                if(res.data.errors){
                    setFormErrors(res.data.errors)
                }else{
                    //redirect to dashboard
                    navigate("/dashboard");
                    window.location.reload();
                }
            })
            .catch(err=>{
                console.log("err after register", err)
            })
        
    }

    // if (!isMember){    
        return (
            <div>
                <h3>Register</h3> 
                <form onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstName" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.firstName?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.lastName?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Street Address</label>
                        <input type="text" name="streetAddress" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.streetAddress?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.city?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">State</label>
                        <input type="text" name="homeState" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.homeState?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Zip Code</label>
                        <input type="text" name="zipCode" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.zipCode?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" name="confirm" id="" className = 'form-control' onChange={changeHandler} />
                        <p className="text-danger">{formErrors.confirm?.message}</p>
                    </div>
                    <input type="submit" value="Register" className="btn btn-primary mt-3" />
                </form>
            </div>
        );
    // }
};


export default RegistrationForm;