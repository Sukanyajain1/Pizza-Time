import React, {useEffect, useState, useParams} from 'react';
import axios from 'axios';
import WithAuth from './WithAuth';
import { useNavigate, Link } from "react-router-dom";


const OrderSummary = (props) => {

    const {currentUser, numInCart, setNumInCart} = props;
    // const [loggedUser, setLoggedUser] = useState();
    const [deleteToggle, setDeleteToggle] = useState();
    const navigate = useNavigate();
    // const {_id} = useParams();

    const [orderItemsList, setOrderItemsList] = useState([]);
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
    // const [deliveryFee, setDeliveryFee] = useState([]);
    const [orderInfo, setOrderInfo] = useState({
        deliveryMethod: "",
        // isFavorite: false,
        pizza_id: [],
        totalAfterTax: null,
    
        // add the user._id for the user that created this object
        user_id: currentUser._id
    });
    const [formErrors, setFormErrors] = useState({});

    const BASE_URL = 'http://localhost:8000/api';

    const priceSetter = ()=>{
        // this function will be there before the useEffect to calculate the total price of all the pizzas before tax and after tax.
        // after the function is called, the return values will be set inside the useEffect under the axios calls in the try block
    }
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const deliveryMethodResponse = await axios.get(`${BASE_URL}/deliveryMethods`);
                const cartItemsResponse = await axios.get(`${BASE_URL}/pizzas/in_cart/${currentUser._id}`);
        
                setDeliveryMethodsList(deliveryMethodResponse.data.results);
                setOrderItemsList(cartItemsResponse.data.results);
                
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };
    
        fetchIngredients();
    }, [deleteToggle]);
    
    
    const deleteHandler = (e, idx)=>{
        // this will handle delete events for all the individual pizzas in the list
        axios.delete(`http://localhost:8000/api/pizzas/${idx}`)
        .then((res)=>{
            console.log("This is the api result: ", res);
            setDeleteToggle(!deleteToggle);
        })
        .catch(err=>{
            console.log("Axios error: ", err);
        });
    }

    const changeHandler = ()=>{
        return "hello"
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
                                orderItemsList.map((pizzaObj, idx)=>{
                                    return (
                                        <div key={idx} className="row">
                                            <div className="col">
                                                <p>Size: {pizzaObj.pizzaSize.name}</p>
                                                <p>Crust: {pizzaObj.crust.name}</p>
                                                <div className="row">
                                                    <p className="col">Toppings:</p>
                                                    <div className="col d-flex flex-wrap">
                                                        {
                                                            pizzaObj.toppings.map((toppingObj, idx)=>{
                                                                return (
                                                                    <p key={idx}>{toppingObj.name}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <Link to={`/pizza-time/pizza/edit/${pizzaObj._id}`}></Link>
                                                <input type="button" onClick={(e)=>deleteHandler(e, idx)}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <h4 className="float-end">PRICE: $ {orderInfo.totalBeforeTax}</h4>
                    <hr />
                    <h3 className="float-end">TOTAL:  ${orderInfo.totalAfterTax}</h3>
                    <div className="d-flex justify-between">
                        <Link to="/pizza-time/new-pizza" className="btn btn-warning border-dark">Add New Pizzas</Link>
                        <button className="btn-success border-dark" onClick={purchaseHandler}>PURCHASE</button>
                    </div>
                </div>
                <div className="col">


                    <div className="form-group">
                        <label htmlFor="">DELIVERY METHOD: </label>
                        <select onChange= {changeHandler} name="pizzaSize" value={orderInfo.deliveryMethod} className="form-select">
                            <option value=""disabled>Choose a delivery option</option>
                            {
                                deliveryMethodsList.map((deliveryObj, idx)=>{
                                    return(
                                        <option key={idx} data-price={deliveryObj.price} value={deliveryObj._id}>{deliveryObj.name}</option>
                                    )
                                })
                            }
                        </select>
                        <p className="text-danger">{formErrors.deliveryMethod?.message}</p>
                    </div>


                    {
                        orderInfo.deliveryMethod === "Carry Out"?
                            <img src="https://media.istockphoto.com/id/1270993769/vector/curbside-pickup-available.jpg?s=612x612&w=0&k=20&c=OVZa_Po3xLXA2zGpxBfpbVXEEOEL3_IRSRRozOLgFGE=" alt="Carry Out" />
                            : orderInfo.deliveryMethod === "Home Delivery"?
                                <img src="https://previews.123rf.com/images/veryfatcat/veryfatcat2006/veryfatcat200600039/148680905-hand-drawn-cartoon-vector-of-pizza-home-delivery-girl-wearing-face-mask-and-head-scarf-riding.jpg" alt="Home Delivery" />
                                : <h3>Choose a Delivery Method</h3>
                    }
                </div>
            </div>
        </>
    );
}

export default WithAuth(OrderSummary);