import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaForm from './PizzaForm';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import WithAuth from './WithAuth';


const NewPizza = ({currentUser, isLogged}) => {
    

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});

    // const [currentUser, isLogged] = useOutletContext();


    // formInfo will be filled with info about the pizza we want to update
    const [formInfo, setFormInfo] = useState({
        pizzaSize: "",
        crust: "",
        sauce: "",
        toppings: [],
        price: 0,
        user_id: currentUser._id
    });

    // TOPPINGS CHECKBOX BOOLEANS
    const [toppingBooleans, setToppingBooleans] = useState({});
    
    const [totalPrice, setTotalPrice] = useState({});
    
    // -----------------------------------------------------------------------------
    // USER AUTH for currently logged user
    // -----------------------------------------------------------------------------
    // useEffect(()=>{
    //     // setAuthToggle(!authToggle) 
    //     console.log("NEW PIZZA: ", currentUser)
    //     if (isLogged){
    //         setToppingBooleans(PizzaService.toppingIsChecked(formInfo.toppings))
    //         console.log("SET TOPPING WAS ATTEMPTED")
    //         console.log(toppingBooleans)
    //     }

    //     // const {pizzaSize, crust, toppings, sauce} = formInfo.price
    //     // setFormInfo({
    //     //     ...formInfo,
    //     //     user_id: currentUser._id,
    //     //     price:{
    //     //         ...formInfo.price,
    //     //         total: (pizzaSize*10 + crust*10 + toppings*10 + sauce*10) /10
    //     //     }
    //     // })
    // }, [currentUser])

    // const priceSetter = async()=>{
    //     const totalPriceSetter = await (PizzaService.sumTotalPrice(formInfo.price))
    //     return totalPriceSetter
    // }

    const priceSetter = ()=>{
        // this will take the toppings list and reference it with the
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        // const userId = {...currentUser._id}
        const {pizzaSize, crust, toppings, sauce} = formInfo.price
        setFormInfo({
            ...formInfo,
            user_id: currentUser._id,
            price: (pizzaSize*10 + crust*10 + toppings*10 + sauce*10) /10
            })
        
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
                    {/* <div className="col" style={{width: "800px",}}>
                        <h1 className="">Total Price:</h1>
                        <h1 className="">{pizzaTotal}</h1>
                    </div> */}
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