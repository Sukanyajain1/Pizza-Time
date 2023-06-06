import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios'
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const SignIn = ({isMember}) => {
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                console.log("cookie cleared", res)
            })
            .catch(err=>{
                console.log("errrr clearing userToken", err)
            })
    }, []);

    return (
        <>
        <div className="col-md-12">
            <div className="card card-container">
                {
                    isMember? <LoginForm/>: <RegistrationForm/>
                }

            </div>
        </div>
        </>
    );
}

export default SignIn;