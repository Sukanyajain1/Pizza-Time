import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';





const SigninNav = () => {
    const [isMember, setIsMember] = useState(true);

    return (
        <>
            {isMember?
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"welcome/register"} onClick={(e)=>{setIsMember(false)}} className="nav-link">New User? Create an Account</Link>
                    </li>
                </div>
            :
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"welcome/login"} onClick={(e)=>{setIsMember(true)}} className="nav-link">Already have an account? Login</Link>
                    </li>
                </div>
            }
        </>
    );
}

export default SigninNav;