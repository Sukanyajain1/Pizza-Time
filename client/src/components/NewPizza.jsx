import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaForm from './PizzaForm';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';


const NewPizza = () => {
    // , allDBSauces, allDBToppings, allDBCrusts, allDBPieSizes
    
    const [currentUser, isLogged, allDBSauces, allDBToppings, allDBCrusts, allDBPieSizes] = useOutletContext();
    // const [allDBSauces, setAllDBSauces] = useState([]);
    // const [allDBToppings, setAllDBToppings] = useState([]);
    // const [allDBCrusts, setAllDBCrusts] = useState([]);
    // const [allDBPieSizes, setAllDBPieSizes] = useState([]);
    
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    // const _id = null


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
    
    // const [totalPrice, setTotalPrice] = useState({});
    const [basePrices, setBasePrices] = useState({
        pizzaSize: 0,
        crust: 0,
        sauce: 0,
        toppings: 0
    });
    

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
                            basePrices={basePrices}
                            setBasePrices={setBasePrices}

                            allDBSauces={allDBSauces}
                            allDBToppings={allDBToppings}
                            allDBCrusts={allDBCrusts}
                            allDBPieSizes={allDBPieSizes}

                            // setAllDBSauces={setAllDBSauces}
                            // setAllDBToppings={setAllDBToppings}
                            // setAllDBCrusts={setAllDBCrusts}
                            // setAllDBPieSizes={setAllDBPieSizes}

                            formErrors={formErrors}
                            buttonValue = "ADD TO ORDER">
                        </PizzaForm>
                    </div>

                    <div className="col" style={{width: "800px",}}>
                        <h1 className="">Total Price:</h1>
                        <h1 className="">${formInfo.price.toFixed(2)}</h1>
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

export default NewPizza;