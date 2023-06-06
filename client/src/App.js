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
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import OrderSummary from './components/OrderSummary';
import NewPizza from './components/NewPizza';
import EditPizza from './components/EditPizza';
import SignIn from  './components/SignIn'
import MainContent from './components/MainContent'
import WithAuth from './components/WithAuth';
import AccountInfo from './components/AccountInfo'
import PizzaRoute from './components/PizzaRoute';




function App() {
  // all wrapped components-- HOC workaround
  const MainContentWithAuth = WithAuth(MainContent);        //custom HOC
  // const DashWithAuth = WithAuth(Dashboard);
  const NavWithAuth = WithAuth(TopNav);
  // const NewPizzaWithAuth = WithAuth(NewPizza);
  // const EditPizzaWithAuth = WithAuth(EditPizza);
  // const OrderSumWithAuth = WithAuth(OrderSummary);
  
  const [isMember, setIsMember] = useState(true);

  return (

    <div className="container-fluid">
      <NavWithAuth isMember={isMember} setIsMember={setIsMember}/>
      <div className="container mt-3">
        <Routes>
          <Route path = "welcome/signin" element= {<SignIn isMember={isMember} setIsMember={setIsMember}/>}>
            {/* <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegistrationForm/>} /> */}
          </Route>
          <Route path = "pizza-time" element= {<MainContentWithAuth/>}>
            <Route path = "dashboard" element={<Dashboard/>}/>
            <Route path = "order-summary" element={<OrderSummary/>}/>
            <Route path = "account-info" element={<AccountInfo/>}/>
            <Route path = "pizza" element= {<PizzaRoute/>}>
              <Route path="new" element={<NewPizza/>}/>
              <Route path = "edit/:_id" element={<EditPizza/>}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>


  );
}

export default App;
