import React, {useEffect, useState} from 'react';
import { useNavigate, useOutletContext, NavLink } from "react-router-dom";
import NavWrapper from '../styles/NavWrapper';

const Dashboard = () => {

    const [currentUser, isLogged] = useOutletContext();

    useEffect(()=>{
        console.log("DASHBOARD: ", currentUser)
    }, [])


    
    return (
        <NavWrapper>
            {isLogged?
            <div>
                <h1>Welcome {currentUser.firstName}, you're in the dashboard! Congrats on being a registered user!</h1>
                <NavLink to={"/pizza-time/pizza/new"} className="">Add a Pizza to your order</NavLink>
            </div>
            : <div>
                <h1>Sorry! Seems like you're not logged in yet! Dashboard</h1>
                <NavLink to={"/welcome/login"} className="">Sign in Here and Start your Pizza Party!</NavLink>
            </div>
            }
        </NavWrapper>
    );
};


export default Dashboard;

