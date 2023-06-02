import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link, redirect } from 'react-router-dom';
import UserService from '../services/user.service'
import LoggedNav from './LoggedNav';
import SigninNav from './SigninNav';


const TopNav = (props) => {

    // const {currentUser, setCurrentUser} = props;
    const {currentUser, isLoading, numInCart, isLogged} = props;

    // const [isSynced, setIsSynced] = useState(false);
    // const [navContent, setNavContent] = useState();

    // let navContent;
    // const [isLogged, setIsLogged] = useState(false);
    
// NOTES:
// keep redirect in the top nav --> it works so much better than navigate and doesn't throw loops


    useEffect(()=>{             //PUT IT IN THE TOP NAV AND USE CHILDTOPARENT PROPS
        // setAuthToggle(!authToggle)
        if(!isLogged){
            console.log("LOGGED USER INFO IN TOP NAV", currentUser)
            
        }else{
            console.log("TopNav changed again");
            console.log(currentUser);
            // setIsSynced(true)
        }
    }, [currentUser])




    if(isLoading){
        return (
            <h1>Loading...</h1>
        )
    }

    // if(isSynced){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                    <div className="container-fluid">
                        <h2>Pizza time!</h2>
                        {isLogged?
                            <LoggedNav currentUser={currentUser} numInCart={numInCart}/>
                        :
                            <SigninNav/>
                        }
                    </div>
                </nav>
            </div>
        );
    // }
};


export default TopNav;











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
