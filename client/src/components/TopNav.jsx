import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, Link, redirect } from 'react-router-dom';

import WithAuth from './WithAuth';


const TopNav = (props) => {

    // const {currentUser, setCurrentUser} = props;
    const {currentUser, numInCart, isLogged, handleLogout} = props;

    const navigate = useNavigate();


    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                navigate("/login", { replace: true });
            })
            .catch(err=>{
                console.log("errrr logging out", err)
            })
    }
    return (
        <div>
{/* 
            <nav>
                <div className="navbar-left">
                    <h1>Pizza Time!</h1>
                </div>
                <div className="navbar-right">
                    {isLogged ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/order-summary">Order Summary</Link>
                        <Link to="/account-info">Account Info</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                    ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                    )}
                </div>
            </nav> */}

            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <div className="">
                    <div className="d-flex justify-content-between container-fluid">
                        <h2>Pizza time!</h2>
                        {isLogged ? (
                            <div className="" style={{gap: "40px"}}>
                                <Link to="/pizza-time/dashboard">Dashboard</Link>
                                <Link to="/pizza-time/order-summary">Order Summary</Link>
                                <Link to="/pizza-time/account-info">Account Info</Link>
                                <Link to="/pizza-time/logout">Logout</Link>
                            </div>
                            ) : (
                            <div className="">
                                <Link to="/welcome/login">Login</Link>
                                <Link to="/welcome/register">Register</Link>
                            </div>
                            )}
                </div>
                </div>
            </nav>
        </div>
    );
    // }
};


export default WithAuth(TopNav);











// {isLogged? (
//     <div className="navbar-nav ml-auto">
//         <li>
//             {/* {console.log(isLogged)} */}
//         </li>
//         <li className="nav-item">
//             <Link to={"pizza-time/dashboard"} className="nav-link">DASHBOARD</Link>
//         </li>
//         <li className="nav-item">
//             <Link to={"pizza-time/order"} className="nav-link">ORDER ({numInCart})</Link>
//         </li>
//         <li className="nav-item">
//             <Link to={"pizza-time/profile"} className="nav-link">{currentUser.firstName}'s ACCOUNT</Link>
//         </li>
//         <li className="nav-item">
//             <a href="welcome/login" className="nav-link" onClick={logout}>LOG OUT</a>
//         </li>
//     </div>
//     ) : isMember?(
//     <div className="navbar-nav ml-auto">
//         <li>
//             {/* {console.log(isLogged)} */}
//         </li>
//         <li className="nav-item">
//             <Link to={"welcome/register"} onClick={(e)=>{setIsMember(false)}} className="nav-link">New User? Create an Account</Link>
//         </li>
//     </div>
//     ) : (
//     <div className="navbar-nav ml-auto">
//         <li>
//             {/* {console.log(isLogged)} */}
//         </li>
//         <li className="nav-item">
//             <Link to={"welcome/login"} onClick={(e)=>{setIsMember(true)}} className="nav-link">Already have an account? Login</Link>
//         </li>
//     </div>
// )}
