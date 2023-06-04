import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaForm from './PizzaForm';
import { useNavigate, Link } from 'react-router-dom';
import WithAuth from './WithAuth';


const NewPizza = ({currentUser, isLogged}) => {
    

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});



    // formInfo will be filled with info about the pizza we want to update
    const [formInfo, setFormInfo] = useState({
        pizzaSize: "",
        crust: "",
        sauce: "",
        toppings: [],
        orderStatus: "pending",
        price: 0,
        user_id: currentUser._id
    });

    // TOPPINGS CHECKBOX BOOLEANS
    const [toppingBooleans, setToppingBooleans] = useState({});
    
    const [totalPrice, setTotalPrice] = useState({});
    

    const submitHandler = (e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/pizzas", formInfo)
        .then((res)=>{
            console.log("Response after axios post request: ", res);
            if(res.data.error){
                // this means there are validation errors we need to save
                setFormErrors(res.data.error.errors);
            }
            else{                         // else means there are no errors, so we can clear our the state variables to clear out the form
                setFormInfo({
                    pizzaSize: "",
                    crust: "",
                    sauce: "",
                    toppings: [],
                    orderStatus: "",
                    price: 0,
                    user_id: ""
                });

                // clear out any past error messages
                setFormErrors({});
                
                navigate("/pizza-time/order-summary");
                window.location.reload();
        }
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })
    }    


    
    return (
        <>
        {isLogged?
            <div>
                <div className="row">
                    <div className="col" style={{maxWidth: "800px",}}>
                        <PizzaForm
                            submitHandler={submitHandler}
                            formInfo={formInfo}
                            setFormInfo={setFormInfo}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                            toppingBooleans={toppingBooleans}
                            setToppingBooleans={setToppingBooleans}
                            formErrors={formErrors}
                            buttonValue = "ADD TO ORDER"
                            currentUser={currentUser}>
                        </PizzaForm>
                    </div>
                    <div className="col" style={{width: "800px",}}>
                        <h1 className="">Total Price:</h1>
                        <h1 className="">{formInfo.price}</h1>
                        <hr />
                        <h5 className="">Pizza Size:</h5>
                        <h5 className="">{formInfo.pizzaSize}</h5>
                        <hr />
                        <h5 className="">crust :</h5>
                        <h5 className="">{formInfo.crust}</h5>
                        <hr />
                        <h5 className="">sauce :</h5>
                        <h5 className="">{formInfo.sauce}</h5>
                        <hr />
                        <h5 className="">toppings :</h5>
                        <h5 className="">{formInfo.toppings}</h5>
                        <hr />
                        <h5 className="">orderStatus :</h5>
                        <h5 className="">{formInfo.orderStatus}</h5>
                        <hr />
                        <h5 className="">user_id :</h5>
                        <h5 className="">{formInfo.user_id}</h5>
                        <hr />
                    </div>
                </div>
            </div>:
                <div>
                    <h1>Sorry! Seems like you're not logged in yet!</h1>
                    <Link to={"/welcome/login"} className="nav-link">Sign in here to Create Your Pizza!</Link>
                </div>
            }
        </>
    );
}

export default WithAuth(NewPizza);