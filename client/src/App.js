import './App.css';
import React, { useState } from "react";
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TopNav from './components/TopNav';
import SignIn from './components/SignIn';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import OrderSummary from './components/OrderSummary';
import PizzaRoute from './components/PizzaRoute';
import NewPizza from './components/NewPizza';
import EditPizza from './components/EditPizza';




function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [numInCart, setNumInCart] = useState({});
  // const [authToggle, setAuthToggle] = useState(false);
  // const navigate = useNavigate();
  
  const userAuth = ()=>{
    console.log("ANOTHA ONEEEEEE!!!!!!!!!!!!!!!")
    axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
    .then(res=>{
        console.log("res when getting logged in user", res)
        if(res.data.results){
            //this means the user is logged in and can accees this page
            setCurrentUser(res.data.results)
            console.log("This is the current user data: ", res.data.results);
            return res.data.results;
        }
    })
    .catch(err=>{
        //this means someone who is not logged in tried to access the dashboard
        console.log("err when getting logged in user", err);
        // return err;
    })
  }

  return (
    <div className="container">
      <BrowserRouter>
        <div className="">
          <TopNav currentUser={currentUser} setCurrentUser={setCurrentUser}></TopNav>
          <div className="container mt-3">
            <Routes>
              <Route path = "welcome" element= {<SignIn/>}>
                <Route index element={<LoginForm />} />
                <Route path="login" element={<LoginForm setCurrentUser={setCurrentUser}/>} />
                <Route path="register" element={<RegistrationForm setCurrentUser={setCurrentUser}/>} />
              </Route>
              <Route path = "pizza-time" element= {<MainContent/>}>
                <Route index element={<Dashboard />} />
                <Route path = "dashboard" element={<Dashboard userAuth={userAuth} currentUser={currentUser}/>}/>
                <Route path = "order-summary" element={<OrderSummary userAuth={userAuth} currentUser={currentUser} numInCart={numInCart} setNumInCart={setNumInCart}/>}/>
                <Route path = "pizza" element= {<PizzaRoute/>}>
                  <Route index element={<NewPizza/>} />
                  <Route path = "new" element={<NewPizza userAuth={userAuth} currentUser={currentUser}/>}/>
                  <Route path = "edit" element={<EditPizza userAuth={userAuth} currentUser={currentUser}/>}/>
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
