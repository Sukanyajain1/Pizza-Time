import React, {useEffect, useState} from 'react';
import { useNavigate, useOutletContext, Link } from "react-router-dom";

const Dashboard = () => {

    // const navigate = useNavigate();
    // const [loggedUser, setLoggedUser] = useState({});
    // const {currentUser} = props;
    const [currentUser, isLogged] = useOutletContext();

    useEffect(()=>{
        // setAuthToggle(!authToggle) 
        console.log("DASHBOARD: ", currentUser)
        // setLoggedUser(componentDidMount);               //what is useReducer????
    }, [])

    // if(isLoading){
    //     return (
    //         <h1>Loading...</h1>
    //     )
    // }
    
    return (
        <div>
            {isLogged?
            <div>
                {/* {console.log("THIS IS THE CURRENT USER", currentUser)} */}
                <h1>Welcome {currentUser.firstName}, you're in the dashboard! Congrats on being a registered user!</h1>
                <Link to={"/pizza-time/pizza/new"} className="nav-link">Add a Pizza to your order</Link>
            </div>
            : <div>
                <h1>Sorry! Seems like you're not logged in yet! Dashboard</h1>
                <Link to={"/welcome/login"} className="nav-link">Sign in Here and Start your Pizza Party!</Link>
            </div>
            }
        </div>
    );
};


export default Dashboard;

