import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PizzaForm from './PizzaForm';
import axios from "axios";



const EditExpense = (props) => {

    const {userAuth, currentUser, numInCart, setNumInCart} = props;
    const [loggedUser, setLoggedUser] = useState();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const {_id} = useParams();
    const [allDBToppings, setAllDBToppings] = useState([]);
    const [allDBCrusts, setAllDBCrusts] = useState([]);
    const [allDBPieSizes, setAllDBPieSizes] = useState([]);

    // formInfo will be filled with info about the ninja we want to update
    const [formInfo, setFormInfo] = useState({
        size: "",
        crust: "",
        quantity: null,
        toppings: [],
        price: null,
        user_id: null,
        order_id: null
    });

    // TOPPINGS CHECKBOX BOOLEANS
    const [formToppings, setFormToppings] = useState({
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

    const sizePriceSetter = ()=>{
        allDBPieSizes.map((sizeObj)=>{
            formInfo.pizzaSize===sizeObj.name?
            setPriceBreakdown(...priceBreakdown, {pizzaSize: sizeObj.price}):
            console.log(`Pizza is not a ${sizeObj.name}`)
            return console.log("size price set successfully")
        });
    }

    const crustPriceSetter = ()=>{
        allDBCrusts.map((crustObj)=>{
            formInfo.crust===crustObj.name?
            setPriceBreakdown(
                ...priceBreakdown,
                {crust: crustObj.price}
            ):
            console.log(`Crust is not ${crustObj.name}`)
            return console.log("crust price set successfully")
        });
    }

    const toppingPriceSetter = ()=>{
        let sumOfToppingPrices= 0;
        allDBToppings.map((toppingObj)=>{
            if (formInfo.toppings.includes(toppingObj.name)){
                sumOfToppingPrices += toppingObj.price;
            }else{
                console.log(`topping is not present: ${toppingObj.name}`)
            }
            return console.log("toppings price set successfully")
        });
        setPriceBreakdown(
            ...priceBreakdown,
            {toppings: sumOfToppingPrices}
        )
    }


    useEffect((_id) => {
        setLoggedUser(userAuth);

        axios.get(`http://localhost:8000/api/pizzas/show_one/${_id}`)
            .then((res)=>{
                console.log("This is the api result: ", res);
                setFormInfo(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
                setFormErrors(err)
            });
        sizePriceSetter();
        crustPriceSetter();
        toppingPriceSetter();
    }, []);




    // changehandler to update the formInfo object with the information from the form
    const changeHandler = (e)=>{
        console.log("changing the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    // submitHandler for when the form submits we send this date to backend to create a new object
    const submitHandler = (e)=>{
        e.preventDefault();
        
        axios.put(`http://localhost:8000/api/pizzas/update/${_id}`, formInfo)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
            if(res.data.error){
                // this means there are validation errors we need to save
                setFormErrors(res.data.error.errors);
            }
            else{
                navigate("/dashboard");
                window.location.reload();
            }
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })
    }    
    
    return (
        <>
            <h3>Edit an Expense</h3>
            <PizzaForm
                changeHandler={changeHandler}
                submitHandler={submitHandler}

                formInfo={formInfo}
                setFormInfo={setFormInfo}

                formToppings={formToppings}
                setFormToppings={setFormToppings}

                priceBreakdown={priceBreakdown}
                setPriceBreakdown={setPriceBreakdown}

                allDBToppings={allDBToppings}
                setAllDBToppings={setAllDBToppings}

                allDBCrusts={allDBCrusts}
                setAllDBCrusts={setAllDBCrusts}

                allDBPieSizes={allDBPieSizes}
                setAllDBPieSizes={setAllDBPieSizes}

                formErrors={formErrors}
                buttonValue = "UPDATE ORDER"
                loggedUser={loggedUser}
            />
        </>
    );
}

export default EditExpense;