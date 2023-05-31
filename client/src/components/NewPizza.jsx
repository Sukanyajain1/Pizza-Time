import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaForm from './PizzaForm';
import { useNavigate } from "react-router-dom";

/* submit handler:
submit the pizza with only the user_id and no order_id (IF POSSIBLE)
no array of pizzas waiting to be submitted to get the order ID

gives the ability to add and update pizzas at will using api routes and data persistence with pizzas in the user's cart after logging off and sigining back in



In the same submit handler, after the order has been submitted with the compact orderFormInfo (only including the Order model attributes), each of the pizzas in the DB with a user_id that matches the current user AND have an undefined order_id will be updated with the new order_id.

allCurrentPizzasList.map((pizzaObj,idx)=>{
    setPizzaInfo(
        ...pizzaInfo,
        order_id: order._id
    )
})


*/

const NewPizza = (props) => {
    
    const {userAuth, currentUser, numInCart, setNumInCart} = props;
    const [loggedUser, setLoggedUser] = useState();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [allDBToppings, setAllDBToppings] = useState([]);
    const [allDBCrusts, setAllDBCrusts] = useState([]);
    const [allDBPieSizes, setAllDBPieSizes] = useState([]);


    // formInfo will be filled with info about the pizza we want to update
    const [formInfo, setFormInfo] = useState({
        pizzaSize: "",
        crust: "",
        quantity: "",
        price: "",
        toppings: [],
        user_id: "",
        order_id: ""
    });

    // const [formToppings, setFormToppings] = useState([]);

    // TOPPINGS CHECKBOX BOOLEANS
    const [toppingBooleans, setToppingBooleans] = useState({
        isPepperoni: false,
        isChicken: false,
        isGroundBeef: false,
        isOlives: false,
        isOnions: false,
        isMushroom: false,
        isPineapple: false,
        isBellPeppers: false,
        isSpinach: false
    });

    // Pizza Price Breakdown
    const [priceBreakdown, setPriceBreakdown] = useState({
        pizzaSize: null,
        crust: null,
        quantity: null,
        toppings: null
    });

    const [toppings, setToppings] = useState([]);

    // -----------------------------------------------------------------------------
    // USER AUTH for currently logged user
    // -----------------------------------------------------------------------------
    useEffect(()=>{
        setLoggedUser(userAuth);
    }, [])

    // changehandler to update the formInfo object with the information from the form
    const changeHandler = (e)=>{

        console.log("changing the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
        
        if (e.target.name != "quantity"){
            let eventPrice = document.querySelector(`option[value="${e.target.value}"]`).dataset.price
            setPriceBreakdown({
                ...priceBreakdown,
                [e.target.name]: Number(eventPrice)
            });
            console.log("THE FORM INFO STATE VARIABLE: ", formInfo)
        }
    }

    // submitHandler for when the form submits we send this date to backend to create a new object
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/pizzas/new", formInfo)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
            if(res.data.error){
                // this means there are validation errors we need to save
                setFormErrors(res.data.error.errors);
            }
            else{// else means there are no errors, so we can clear our the state variables to clear out the form
                setFormInfo({
                    size: "",
                    crust: "",
                    quantity: null,
                    toppings: [],
                    price: null,
                    user_id: null,
                    order_id: null
                });

                // clear out any past error messages
                setFormErrors({});
                
                navigate("pizza-time/order-summary");
                window.location.reload();
        }
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })
    }    

    
    return (
        <>
            <h3>Create an Expense</h3>
            <PizzaForm
                changeHandler={changeHandler}
                submitHandler={submitHandler}

                formInfo={formInfo}
                setFormInfo={setFormInfo}

                // formToppings={formToppings}
                // setFormToppings={setFormToppings}

                toppingBooleans={toppingBooleans}
                setToppingBooleans={setToppingBooleans}

                priceBreakdown={priceBreakdown}
                setPriceBreakdown={setPriceBreakdown}

                allDBToppings={allDBToppings}
                setAllDBToppings={setAllDBToppings}

                allDBCrusts={allDBCrusts}
                setAllDBCrusts={setAllDBCrusts}

                allDBPieSizes={allDBPieSizes}
                setAllDBPieSizes={setAllDBPieSizes}

                formErrors={formErrors}
                buttonValue = "ADD TO ORDER"
                user_id={currentUser._id}>
            </PizzaForm>
        </>
    );
}

export default NewPizza;