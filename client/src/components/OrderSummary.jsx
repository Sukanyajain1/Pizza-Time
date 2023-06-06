import React, {useEffect, useState, useParams} from 'react';
import axios from 'axios';
import { useNavigate, Link, useOutletContext } from "react-router-dom";


const OrderSummary = (props) => {

    // const {currentUser, numInCart, setNumInCart} = props;
    const [currentUser, isLogged] = useOutletContext();

    const [deleteToggle, setDeleteToggle] = useState();

    const navigate = useNavigate();
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [orderItemsList, setOrderItemsList] = useState([]);
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
    const [orderInfo, setOrderInfo] = useState({
        user_id: currentUser._id,
        deliveryMethod: "",
        pizza_id: [],
        isFavorite: false,
        totalAfterTax: null,
    
        // add the user._id for the user that created this object
        user_id: currentUser._id
    });
    const [formErrors, setFormErrors] = useState({});

    const [beforeTax, setBeforeTax] = useState(0);
    const [afterTax, setAfterTax] = useState(0);

    
    const priceSetter = (cartItemsList)=>{
        // this function will be there before the useEffect to calculate the total price of all the pizzas before tax and after tax.
        // after the function is called, the return values will be set inside the useEffect under the axios calls in the try block
        
        const sumWithInitial = cartItemsList.reduce((total, pizza) =>
        total + pizza.price,
        0
        );
        
        const finalBaseVal = sumWithInitial + deliveryFee
        const finalAfterTax = finalBaseVal * 1.08875
        setBeforeTax(Math.round((finalBaseVal + Number.EPSILON) * 100) / 100)
        setAfterTax(Math.round((finalAfterTax + Number.EPSILON) * 100) / 100)
        // Math.round((finalAfterTax + Number.EPSILON) * 100) / 100
        // setOrderInfo({
        //     ...orderInfo,
        //     totalAfterTax: (Math.round((finalAfterTax + Number.EPSILON) * 100) / 100)
        // })
        return finalAfterTax
    }
    
    const BASE_URL = 'http://localhost:8000/api';

    useEffect(() => {
        const fetchOrderSummaryInfo = async () => {
            try {
                const deliveryMethodResponse = await axios.get(`${BASE_URL}/deliveryMethods`);
                const cartItemsResponse = await axios.get(`${BASE_URL}/pizzas/in_cart/${currentUser._id}`);
        
                setDeliveryMethodsList(deliveryMethodResponse.data.results);
                
                setOrderItemsList(cartItemsResponse.data.results);
                const newOrderItems = []
                cartItemsResponse.data.results.forEach((item)=> newOrderItems.push(item._id))
                const totalOrderAmount = priceSetter(cartItemsResponse.data.results)
                setOrderInfo({
                    ...orderInfo,
                    pizza_id: newOrderItems,
                    totalAfterTax: Math.round((totalOrderAmount + Number.EPSILON) * 100) / 100
                });
                // set
            } catch (error) {
                console.error('Error fetching Order Summary Info:', error);
            }
        };
    
        fetchOrderSummaryInfo();
    }, [deleteToggle, deliveryFee]);
    
    
    const deleteHandler = (e, _id)=>{
        // this will handle delete events for all the individual pizzas in the list

        axios.delete(`http://localhost:8000/api/pizzas/${_id}`)
        .then((res)=>{
            console.log("This is the api result: ", res);
            setDeleteToggle(!deleteToggle);
        })
        .catch(err=>{
            console.log("Axios error: ", err);
        });
    }

    const changeHandler = (e)=>{
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value
        })

        const eventPrice = Number(document.querySelector(`option[value="${e.target.value}"]`).dataset.price)
        setDeliveryFee(eventPrice)
    }





    const purchaseHandler = (e)=>{
        e.preventDefault();
        // for all the pizzas in the order Info pizza_id list, update the the orderStatus for each pizza to be "submitted"
        orderInfo.pizza_id.forEach((id)=>
            axios.put(`http://localhost:8000/api/pizzas/orderStatus/${id}`)
                .then((res)=>console.log("axios order status update result: ", res))
                .catch(err=>console.log("axios order status update error: ", err))
        )
        
        axios.post("http://localhost:8000/api/orders", orderInfo)
        .then((res)=>{
            console.log("Response after axios post request: ", res);
            if(res.data.error){
                // this means there are validation errors we need to save
                setFormErrors(res.data.error.errors);
            }
            else{                         // else means there are no errors, so we can clear our the state variables to clear out the form
                setOrderInfo({
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
                
                navigate("/pizza-time/dashboard");
                window.location.reload();
        }
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })
    }

    return (
        <>
                    <div className="row">
                        <div className="col">
                            <h3>YOUR ORDER</h3>
                                    <div>
                                        {
                                            orderItemsList.map((pizzaObj, idx)=>{
                                                return (
                                                    <div key={idx} className="row border">
                                                        <div className="col">
                                                            <p><strong>Size:</strong> {pizzaObj.pizzaSize}</p>
                                                            <p><strong>Crust:</strong> {pizzaObj.crust}</p>
                                                            <p className=""><strong>Toppings:</strong>
                                                                <span className="d-flex flex-wrap">
                                                                    {
                                                                        pizzaObj.toppings.map((toppingObj, idx)=>{
                                                                            return (
                                                                                <li key={idx} className="mx-2" style={{listStyle: "none"}}>{toppingObj}</li>
                                                                            )
                                                                        })
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p><strong>Price:</strong> ${Number(pizzaObj.price).toFixed(2)}</p>
                                                        </div>
                                                        <div className="col" style={{gap: "20px"}}>
                                                            <Link className="btn btn-warning" to={`/pizza-time/pizza/edit/${pizzaObj._id}`}>Edit</Link>
                                                            <button className="btn btn-danger" onClick={(e)=>deleteHandler(e, pizzaObj._id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <br />
                            <h4 className="">Before Tax: ${beforeTax.toFixed(2)}</h4>
                            <hr />
                            <h3 className="">TOTAL:  ${afterTax.toFixed(2)}</h3>
                            <div className="d-flex justify-between">
                                <Link to="/pizza-time/pizza/new" className="btn btn-warning border-dark mx-2">Add New Pizzas</Link>
                                <button className="btn btn-success border-dark" onClick={purchaseHandler}>PURCHASE</button>
                            </div>
                        </div>
                        
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">DELIVERY METHOD: </label>
                                <select onChange= {changeHandler} name="deliveryMethod" value={orderInfo.deliveryMethod} className="form-select">
                                    <option value=""disabled>Choose a delivery option</option>
                                    {
                                        deliveryMethodsList.map((deliveryObj, idx)=>{
                                            return(
                                                <option key={idx} data-price={deliveryObj.price} value={deliveryObj.name}>{deliveryObj.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <p className="text-danger">{formErrors.deliveryMethod?.message}</p>
                            </div>
                            {
                                orderInfo.deliveryMethod === "6475c76d2976805f96a0fb56"?     //Carry Out
                                    <img style={{width: "500px"}} src="https://media.istockphoto.com/id/1270993769/vector/curbside-pickup-available.jpg?s=612x612&w=0&k=20&c=OVZa_Po3xLXA2zGpxBfpbVXEEOEL3_IRSRRozOLgFGE=" alt="Carry Out" />
                                    : orderInfo.deliveryMethod === "6475c76d2976805f96a0fb57"?       //Home Delivery
                                        <img style={{width: "500px"}}  src="https://previews.123rf.com/images/veryfatcat/veryfatcat2006/veryfatcat200600039/148680905-hand-drawn-cartoon-vector-of-pizza-home-delivery-girl-wearing-face-mask-and-head-scarf-riding.jpg" alt="Home Delivery" />
                                        : <h3>Choose a Delivery Method</h3>
                            }
                        </div>
                    </div>
        </>
    );
}

export default OrderSummary;