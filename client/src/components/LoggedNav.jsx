import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoggedNav = (props) => {
    const {currentUser, numInCart} = props;
    const navigate = useNavigate();

    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                navigate("welcome/login");
                window.location.reload();
            })
            .catch(err=>{
                console.log("errrr logging out", err)
            })
    }

    return (
        <>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"pizza-time/dashboard"} className="nav-link">DASHBOARD</Link>
                </li>
                <li className="nav-item">
                    <Link to={"pizza-time/order"} className="nav-link">ORDER ()</Link>
                </li>
                <li className="nav-item">
                    <Link to={"pizza-time/profile"} className="nav-link">{currentUser.firstName}'s ACCOUNT</Link>
                </li>
                <li className="nav-item">
                    <a href="welcome/login" className="nav-link" onClick={logout}>LOG OUT</a>
                </li>
            </div>
        </>
    );
}

export default LoggedNav;




