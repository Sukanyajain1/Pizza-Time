import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  redirect
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
import UserService from './services/user.service'





function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [authToggle, setAuthToggle] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  // const [isLoading, setLoading] = useState(true);

  // const [userTabToggle, setUserTabToggle] = useState({});
  const [numInCart, setNumInCart] = useState({});
  // const [authToggle, setAuthToggle] = useState(false);
  // const navigate = useNavigate();
  

  // const componentDidMount = ()=>{
  //   setCurrentUser(
  //     UserService.verifyCurrentUser(),
  //     ()=>{
  //       console.log('THIS IS THE USER FROM THE APP COMPONENT: ', currentUser)
  //       setIsLoading(false)
  //       setIsLogged(true)
  //     }
  //   )
  // }
  // const componentDidMount = ()=>{
  // }

  // const promiseState = async state =>
  // {new Promise(resolve => this.setState(state, resolve));}

  // promiseState({})
  //     .then(() => promiseState({verifyCurrentUser}))
  //     .then(() => {
  //           // other code
  //         return promiseState({});
  //     })
  //     .then(() => {});

  useEffect(() => {
    console.log("ANOTHA ONEEEEEE!!!!!!!!!!!!!!!")
    axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
    .then(res=>{
        console.log("res when getting logged in user", res);
        if(res.data.results){
            //this means the user is logged in and can accees this page
            setCurrentUser(res.data.results);
            setIsLoading(false)
            setIsLogged(true);
            console.log("This is the current user data in app js: ", res.data.results);
            // setNavToggle(!navToggle)
            // return res.data.results;
        }
    })
    .catch(err=>{
        //this means someone who is not logged in tried to access the dashboard
        console.log("err when getting logged in user", err);
        setIsLogged(false);

        // return err;
    // setIsLoading(false)
    })
  }, [authToggle]);



  // const componentDidMount = ()=>{
  //   console.log("ANOTHA ONEEEEEE!!!!!!!!!!!!!!!")
  //   axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
  //   .then(res=>{
  //       console.log("res when getting logged in user", res);
  //       if(res.data.results){
  //           //this means the user is logged in and can accees this page
  //           setCurrentUser(res.data.results);
  //           setIsLoading(false)
  //           setIsLogged(true);
  //           console.log("This is the current user data: ", res.data.results);
  //           return res.data.results;
  //       }
  //   })
  //   .catch(err=>{
  //       //this means someone who is not logged in tried to access the dashboard
  //       console.log("err when getting logged in user", err);
  //       setIsLogged(false);

  //       // return err;
  //   // setIsLoading(false)
  //   })
  // }

  return (
    <div className="container">
      <div className="">
        <TopNav currentUser={currentUser} authToggle={authToggle} setAuthToggle={setAuthToggle} isLoading={isLoading} isLogged={isLogged} numInCart={numInCart}></TopNav>
        <div className="container mt-3">
          <Routes>
            <Route path = "welcome" element= {<SignIn/>}>
              <Route index element={<LoginForm />} />
              <Route path="login" element={<LoginForm setCurrentUser={setCurrentUser}/>} />
              <Route path="register" element={<RegistrationForm setCurrentUser={setCurrentUser}/>} />
            </Route>
            <Route path = "pizza-time" element= {<MainContent currentUser={currentUser} authToggle={authToggle} setAuthToggle={setAuthToggle} isLoading={isLoading} isLogged={isLogged}/>}>
              <Route index element={<Dashboard />} />
              <Route path = "dashboard" element={<Dashboard/>}/>
              <Route path = "order-summary" element={<OrderSummary setNumInCart={setNumInCart}/>}/>
              <Route path = "pizza" element= {<PizzaRoute/>}>
                <Route index element={<NewPizza/>} />
                <Route path = "new" element={<NewPizza/>}/>
                <Route exact path = "edit/:id" element={<EditPizza/>}/>
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
