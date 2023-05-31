import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link, redirect } from 'react-router-dom';

const TopNav = (props) => {

    // const {currentUser, setCurrentUser} = props;
    const {currentUser, numInCart} = props;

    const navigate = useNavigate();
    const [isMember, setIsMember] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    
// NOTES:
// keep redirect in the top nav --> it works so much better than navigate and doesn't throw loops


    useEffect(()=>{             //PUT IT IN THE TOP NAV AND USE CHILDTOPARENT PROPS
        if(!currentUser.firstName){
            console.log("LOGGED USER INFO IN TOP NAV", currentUser)
            redirect("/welcome/login")
            // window.location.reload()
            setIsLogged(false);
        }else{
            console.log("TopNav changed again");
            setIsLogged(true);
        }
    }, [currentUser])


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
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <div className="container-fluid">
                    <h2>Pizza time!</h2>
                    {isLogged? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"pizza-time/dashboard"} className="nav-link">DASHBOARD</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"pizza-time/order"} className="nav-link">ORDER ({numInCart})</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"pizza-time/profile"} className="nav-link">{currentUser.firstName}'s ACCOUNT</Link>
                            </li>
                            <li className="nav-item">
                                <a href="welcome/login" className="nav-link" onClick={logout}>LOG OUT</a>
                            </li>
                        </div>
                        ) : isMember?(
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"welcome/register"} onClick={(e)=>{setIsMember(false)}} className="nav-link">New User? Create an Account</Link>
                            </li>
                        </div>
                        ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"welcome/login"} onClick={(e)=>{setIsMember(true)}} className="nav-link">Already have an account? Login</Link>
                            </li>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};


export default TopNav;