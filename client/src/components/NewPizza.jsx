import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaForm from './PizzaForm';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import PizzaService from '../services/pizza.service'


const NewPizza = () => {
    
    // const {userAuth, currentUser, numInCart, setNumInCart} = props;
    // const [loggedUser, setLoggedUser] = useState();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [currentUser, userAuth, isLogged] = useOutletContext();


    // formInfo will be filled with info about the pizza we want to update
    const [formInfo, setFormInfo] = useState({
        pizzaSize: "",
        crust: "",
        sauce: "",
        orderStatus: "pending",
        price: {
            pizzaSize: null,
            crust: null,
            sauce: null,
            toppings: null,
            total: null
        },
        toppings: [],
        user_id: null
    });

    // TOPPINGS CHECKBOX BOOLEANS
    const [toppingBooleans, setToppingBooleans] = useState({});

    
    // -----------------------------------------------------------------------------
    // USER AUTH for currently logged user
    // -----------------------------------------------------------------------------
    useEffect(()=>{
        userAuth();
        if (isLogged){
            setToppingBooleans(PizzaService.toppingIsChecked(formInfo.toppings))
        }
    }, [])



    const submitHandler = (e)=>{
        e.preventDefault();
        const userId = {...currentUser._id}
        setFormInfo({
            ...formInfo,
            user_id: userId
            // price:{
            //     ...formInfo.price,
            //     total: PizzaService.sumTotalPrice(formInfo.price)
            // }
        })
        axios.post("http://localhost:8000/api/pizzas", formInfo)
            .then((res)=>{
                console.log("Response after axios put request: ", res);
                if(res.data.error){
                    // this means there are validation errors we need to save
                    setFormErrors(res.data.error.errors);
                }
                else{                         // else means there are no errors, so we can clear our the state variables to clear out the form
                    setFormInfo({
                        size: "",
                        crust: "",
                        sauce: "",
                        orderStatus: "pending",
                        toppings: [],
                        price: {
                            pizzaSize: null,
                            crust: null,
                            toppings: null,
                            total: null
                        },
                        user_id: null
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
                <h3>Create an Expense</h3>
                <PizzaForm
                    submitHandler={submitHandler}
                    formInfo={formInfo}
                    setFormInfo={setFormInfo}
                    toppingBooleans={toppingBooleans}
                    setToppingBooleans={setToppingBooleans}
                    formErrors={formErrors}
                    buttonValue = "ADD TO ORDER"
                    user_id={currentUser}>
                </PizzaForm>
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