import React, {useEffect, useState} from 'react';

import { useNavigate, Link } from "react-router-dom";

const Dashboard = (props) => {

    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState({});
    const {userAuth, currentUser} = props;


    useEffect(()=>{
        setLoggedUser(userAuth);               //what is useReducer????
    }, [])


    return (
        <div>
            <h1>Welcome {currentUser.firstName}, you're in the dashboard! Congrats on being a registered user!</h1>
            <Link to={"/pizza-time/pizza/new"} className="nav-link">Add a Pizza to your order</Link>
        </div>
    );
};


export default Dashboard;