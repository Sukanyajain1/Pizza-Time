import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const AccountInfo = () => {
    const [currentUser, isLogged] = useOutletContext();

    const [allPastOrders, setAllPastOrders] = useState([]);
    const [favoriteToggle, setFavoriteToggle] = useState([]);
    const BASE_URL = 'http://localhost:8000/api';

    useEffect(() => {
        const fetchPastOrders = async () => {
            try {
                const pastOrdersResponse = await axios.get(`${BASE_URL}/orders/past/${currentUser._id}`);
        
                console.log("These are the past orders: ", pastOrdersResponse.data.results)
                setAllPastOrders(pastOrdersResponse.data.results);
                
            } catch (error) {
                console.error('Error fetching Order Summary Info:', error);
            }
        };
    
        fetchPastOrders();
    }, [favoriteToggle]);


    const favoriteHandler = (e)=>{
        e.preventDefault();

        const order_id = e.target.dataset.id;
        
        axios.put(`http://localhost:8000/api/orders/favorite/${order_id}`)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
        })
        .catch(err=>{
            console.log("Axios PUT Route error: ", err)
        })
        setFavoriteToggle(!favoriteToggle)
    }

    return (
        <>
            {/* <h1>hello and welcome to the account info page</h1> */}
            <div className="row">
                <div className="col-5">
                    <h4><u>Account Info:</u></h4>
                    <h5><u>Name:</u></h5> <p>{currentUser.firstName}  {currentUser.lastName}</p>
                    <h5><u>Email:</u></h5> <p>{currentUser.email}</p>
                    <h5><u>Delivery Address:</u></h5>
                    <div>
                        <p>{currentUser.streetAddress},  {currentUser.city}</p>
                        <p>{currentUser.homeState}  {currentUser.zipCode}</p>
                    </div>
                </div>
                <div className="col">
                    <h4><u>Past Orders</u></h4>
                    {allPastOrders.map((orderObj, idx)=>{
                        return(
                            <div key={idx} className="row border">
                                <div className="col">
                                    <p>{orderObj.createdAt}</p>
                                    {
                                        orderObj.pizza_id.map((pizzaObj, idx)=>{
                                            return(
                                                <div key={idx} className='d-flex align-items-center justify-content-between border-bottom'>
                                                    <div>
                                                        <p className="mb-3"><strong>{pizzaObj.pizzaSize}</strong> - {pizzaObj.crust} - {pizzaObj.sauce}</p>
                                                        <p>{pizzaObj.toppings}</p>
                                                    </div>
                                                    <p>${pizzaObj.price}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="col-4 d-flex align-items-center justify-content-end">
                                    <p className='mb-0 mx-2'>Favorite</p>
                                    <input type="checkbox" name="isFavorite" data-id={orderObj._id} checked={orderObj.isFavorite} onChange={favoriteHandler}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default AccountInfo;


                                    {/* return(
                                        <tr key={idx}>
                                            <td>{orderObj}</td>
                                        </tr>
                                    )
                                }) */}