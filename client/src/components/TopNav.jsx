import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, NavLink, redirect } from 'react-router-dom';
import '../App.css'
import WithAuth from './WithAuth';
import SigninNav from './SigninNav';
import NavWrapper from '../styles/NavWrapper';


const TopNav = (props) => {

    // const {currentUser, setCurrentUser} = props;
    const {currentUser, isLogged, isMember, setIsMember, handleLogout} = props;

    const navigate = useNavigate();
    const [numInCart, setNumInCart] = useState();


    useEffect(() => {

        if(isLogged) {
            axios.get(`http://localhost:8000/api/pizzas/in_cart/${currentUser._id}`)
                .then((res)=>{
                    console.log("This is the api result: ", res);
                    setNumInCart((res.data.results).length);
                })
                .catch(err=>{
                    console.log("Axios error: ", err);
                });
        }
    }, []);

    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                navigate("/welcome/login", { replace: true });
            })
            .catch(err=>{
                console.log("errrr logging out", err)
            })
    }
    return (
        <div>


                <div className="nav">
                    <div className="container d-flex align-items-center justify-content-between">
                        <h2>Pizza time!</h2>
                        {isLogged ? (
                            <NavWrapper>
                            {/* <div> */}

                                <NavLink to="/pizza-time/dashboard" className={({isActive}) => (isActive ? "active-style" : 'none')}>Dashboard</NavLink>
                                <NavLink to="/pizza-time/order-summary" className={({isActive}) => (isActive ? "active-style" : 'none')}>Order Summary ({numInCart})</NavLink>
                                <NavLink to="/pizza-time/account-info" className={({isActive}) => (isActive ? "active-style" : 'none')}>Account Info</NavLink>
                                <NavLink onClick={logout} className={({isActive}) => (isActive ? "active-style" : 'none')}>Logout</NavLink>
                            {/* </div> */}
                            </NavWrapper>
                        ) : 
                        <SigninNav isMember={isMember} setIsMember={setIsMember}></SigninNav>

                        }
                    </div>
                </div>
        </div>
    );
    // }
};


export default WithAuth(TopNav);

