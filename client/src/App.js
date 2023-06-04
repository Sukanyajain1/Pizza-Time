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

// all wrapped components-- HOC workaround
const DashWithAuth = WithAuth(Dashboard);
const NavWithAuth = WithAuth(TopNav);
const NewPizzaWithAuth = WithAuth(NewPizza);
const EditPizzaWithAuth = WithAuth(EditPizza);
const OrderSumWithAuth = WithAuth(OrderSummary);




function App() {

  return (
    <div className="">
      {/* <TopNav/>
      <div>
        <Routes>
          <Route exact path="/" component={LoginForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/dashboard" component={WithAuth(Dashboard)} />
          <Route path="/new-pizza" component={WithAuth(NewPizza)} />
          <Route path="/edit-pizza/:id" component={WithAuth(EditPizza)} />
          <Route path="/order-summary" component={WithAuth(OrderSummary)} />
          <Route path="/account-info" component={WithAuth(AccountInfo)} />
        </Routes>
      </div> */}



      <div className="">
        <NavWithAuth/>
        <div className="container mt-3">
          <Routes>
            <Route path = "welcome" element= {<SignIn/>}>
              <Route path="login" element={<LoginForm/>} />
              <Route path="register" element={<RegistrationForm/>} />
            </Route>
            <Route path = "pizza-time" element= {<MainContent/>}>
              <Route path = "dashboard" element={<DashWithAuth/>}/>
              <Route path = "order-summary" element={<OrderSumWithAuth/>}/>
              <Route path="new-pizza" element={<NewPizzaWithAuth/>}/>
              <Route path = "edit-pizza/:id" element={<EditPizzaWithAuth/>}/>
              </Route>
          </Routes>
        </div>
      </div>

      
    </div>
  );
}

export default App;
