import React, {useEffect, useState, useParams} from 'react';
import axios from 'axios';

import { useNavigate, Link } from "react-router-dom";


const OrderSummary = (props) => {

    const {userAuth, currentUser, numInCart, setNumInCart} = props;
    const [loggedUser, setLoggedUser] = useState();
    const navigate = useNavigate();
    const {_id} = useParams();

    const [currentPizzasList, setCurrentPizzasList] = useState([]);
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState([]);
    const [formInfo, setFormInfo] = useState({
        deliveryMethod: "",
        isFavorite: false,
        totalBeforeTax: null,
        totalAfterTax: null,
    
        // add the user._id for the user that created this object
        user_id: ""
    });
    const [formErrors, setFormErrors] = useState({});

    // this will be the list of all the pizzas created and lined up before purchase
    // the total order price will be calculated by summing all of the pizza prices before tax and delivery
    // the delivery method is an attribute of the ORDER MODEL even though it is in the pizza form


    useEffect(()=>{
        setLoggedUser(userAuth);
        if(!loggedUser.firstName){
            console.log("LOGGED USER INFO", loggedUser)
            navigate("welcome/login");
            window.location.reload();
        }else{
            console.log("verified the logged user again")
            axios.get(`http://localhost:8000/api/pizzas/show_in_cart/${_id}`)
                .then((res)=>{
                    console.log("This is the api result: ", res);
                    setCurrentPizzasList(res.data.results);
                    setNumInCart(currentPizzasList.length)
                })
                .catch(err=>{
                    console.log("Axios error: ", err);
                });

            axios.get(`http://localhost:8000/api/deliveryMethods`)
                .then((res)=>{
                    console.log("This is the api result: ", res);
                    setDeliveryMethodsList(res.data.results)
                })
                .catch(err=>{
                    console.log("Axios error: ", err);
                });
        }
    }, [])


    const orderPriceHandler = (fee)=>{
        let sumBeforeTax = null;
        let sumAfterTax = null;

        currentPizzasList.map((pizzaObj)=>{
            sumBeforeTax += pizzaObj.price;
            return sumBeforeTax;
        })
        sumBeforeTax += fee;
        sumAfterTax += (sumBeforeTax * 1.0875);
        setFormInfo(
            ...formInfo,
            {totalBeforeTax: sumBeforeTax},
            {totalAfterTax: sumAfterTax}
        )
    }


    const changeHandler = (e)=>{
        setFormInfo(
            ...formInfo,
            {deliveryMethod: e.target.value}
        )
        setDeliveryFee(e.target.id)
        orderPriceHandler(deliveryFee);
    }

    const purchaseHandler = ()=>{
        
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <h3>YOUR ORDER</h3>
                    <div className="row">
                        <div className="col">
                            {
                                currentPizzasList.map((pizzaObj)=>{
                                    return (
                                        <div className="row">
                                            <div className="col">
                                                <p>Qty: {pizzaObj.quantity}</p>
                                                <p>Size: {pizzaObj.size}</p>
                                                <p>Crust: {pizzaObj.crust}</p>
                                                <div className="row">
                                                    <p className="col">Toppings:</p>
                                                    <div className="col d-flex flex-wrap">
                                                        {
                                                            pizzaObj.toppings.map((oneToppingObj)=>{
                                                                return (
                                                                    <p>{oneToppingObj.name}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <Link to={`/pizza-time/pizza/edit/${pizzaObj._id}`}></Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <h4 className="float-end">PRICE: $ {formInfo.totalBeforeTax}</h4>
                    <hr />
                    <h3 className="float-end">TOTAL:  ${formInfo.totalAfterTax}</h3>
                    <div className="d-flex justify-between">
                        <Link to="/pizza-time/pizza/new" className="btn btn-warning border-dark">Add New Pizzas</Link>
                        <button className="btn-success border-dark" onClick={purchaseHandler}>PURCHASE</button>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="">DELIVERY METHOD:</label>
                        <select class="form-select" aria-label="Default select example" name="deliveryMethod" value={formInfo.deliveryMethod} onChange={changeHandler}>
                            <option selected>Choose a delivery option</option>
                            {
                                deliveryMethodsList.map((methodObj, idx)=>{
                                    return(
                                        <option key={idx} id={methodObj.price} value={methodObj.name}>{methodObj.name}</option>
                                    )
                                })
                            }
                        </select>
                        <p className="text-danger">{formErrors.deliveryMethod?.message}</p>
                    </div>
                    {
                        formInfo.deliveryMethod === "Carry Out"?
                            <img src="" alt="Carry Out" />
                            : formInfo.deliveryMethod === "Home Delivery"?
                                <img src="" alt="Home Delivery" />
                                : <img src="" alt="Choose a Delivery Method" />
                    }
                </div>
            </div>
        </>
    );
}

export default OrderSummary;