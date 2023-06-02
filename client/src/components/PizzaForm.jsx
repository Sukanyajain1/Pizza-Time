import React, { useEffect, useState } from 'react';
import axios from "axios";
import PizzaService from '../services/pizza.service';
import DataService from '../services/data.service';


const PizzaForm = (props) => {
    const {
        submitHandler,
        // changeHandler,
        formInfo, setFormInfo,
        // formToppings, setFormToppings,
        toppingBooleans, setToppingBooleans,
        // priceBreakdown, setPriceBreakdown,
        formErrors,
        buttonValue,
        currentUser
    } = props;
    
    const [allDBSauces, setAllDBSauces] = useState([]);
    const [allDBToppings, setAllDBToppings] = useState([]);
    const [allDBCrusts, setAllDBCrusts] = useState([]);
    const [allDBPieSizes, setAllDBPieSizes] = useState([]);


    // const allDBToppings = DataService.getAllDBToppings()
    // const allDBCrusts = DataService.getAllDBCrusts()
    // const allDBPieSizes = DataService.getAllDBPieSizes()

    useEffect(() => {
        // const getAllDBSauces = ()=>{
            axios.get("http://localhost:8000/api/sauces")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllDBSauces(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
        // }
        
        
        // const getAllDBToppings = ()=>{
            axios.get("http://localhost:8000/api/toppings")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllDBToppings(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
        // }
        
        
        // const getAllDBCrusts = ()=>{
            axios.get("http://localhost:8000/api/crusts")
                .then((res)=>{
                    console.log("This is the api result: ", res);
                    setAllDBCrusts(res.data.results) 
                })
                .catch(err=>{
                    console.log("Axios error: ", err);
                });
            // }
        
        
        // const getAllDBPieSizes = ()=>{
            axios.get("http://localhost:8000/api/pizzaSizes")
                .then((res)=>{
                    console.log("This is the api result: ", res);
                    setAllDBPieSizes(res.data.results)
                })
                .catch(err=>{
                    console.log("Axios error: ", err);
                });
            // }
        // setAllDBToppings(DataService.getAllDBToppings())
        // setAllDBCrusts(DataService.getAllDBCrusts())
        // setAllDBPieSizes(DataService.getAllDBPieSizes())
    }, []);
    

    // changehandler to update the formInfo object with the information from the form
    const changeHandler = (e)=>{
        console.log("changing the form!")
        let eventPrice = document.querySelector(`option[value="${e.target.value}"]`).dataset.price
        // const {pizzaSize: a, crust: b, sauce: c, toppings: d} = formInfo.price
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
            price: {
                ...formInfo.price,
                [e.target.name]: Number(eventPrice),
                total: PizzaService.sumTotalPrice(formInfo.price)
            }
        });
        
        
            // const {pizzaSize, crust, toppings} = formInfo.price
            // setFormInfo({
            //     ...formInfo,
            //     [e.target.name]: e.target.value,
            //     price: {
            //         ...formInfo.price,
            //         [e.target.name]: Number(eventPrice),
            //         total: PizzaService.sumTotalPrice(formInfo.price, formInfo.quantity)
            //     }
            // });
            console.log("THE FORM INFO STATE VARIABLE: ", formInfo)
        
    }

    const toggleToppings = (e, oneToppingName, oneToppingKey) => {
        if(e.target.type === "checkbox"){
            const eventPrice = Number(e.target.dataset.price)
            // check if it is already added
            if(formInfo[e.target.name].includes(oneToppingName)) {
    
                // Remove the existing id 
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: formInfo[e.target.name].filter(item => item !== oneToppingName),
                    price: {
                        ...formInfo.price,
                        [e.target.name]: formInfo.price[e.target.name] - eventPrice
                    }
                })
            } else {
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: [...formInfo[e.target.name], oneToppingName],
                    price: {
                        ...formInfo.price,
                        [e.target.name]: formInfo.price[e.target.name] + eventPrice
                    }
                })
            }
            setToppingBooleans({
                ...toppingBooleans,
                [oneToppingKey]: e.target.checked
            })
        } else{
            console.log("Something went wrong with toppingHandler in PizzaForm")
        }
    };

    return (
        <>
            <h2 className="float-center">CRAFT-A-PIZZA</h2>
            {/* <h3>The console logger: {formInfo.toppings}</h3> */}
            <form onSubmit={submitHandler} action="" className="">
            <input type="text" className="hidden" name="user_id" value={currentUser._id}/>
                <div className="form-group">
                    <label htmlFor="">Size: </label>
                    <select onChange= {changeHandler} name="pizzaSize" value={formInfo.pizzaSize} className="form-select">
                        <option value=""disabled>Select a pie size!</option>
                        {
                            allDBPieSizes.map((sizeObj, idx)=>{
                                return(
                                    <option key={idx} data-price={sizeObj.price} value={sizeObj.name}>{sizeObj.name} - {sizeObj.price}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.pizzaSize?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Crust:</label>
                    <select onChange= {changeHandler} name="crust" value={formInfo.crust} className="form-select">
                        <option value=""disabled>Select a crust!</option>
                        {
                            allDBCrusts.map((crustObj, idx)=>{
                                return(
                                    <option key={idx} data-price={crustObj.price} value={crustObj.name}>{crustObj.name} - {crustObj.price}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.crust?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Sauce:</label>
                    <select onChange= {changeHandler} name="sauce" value={formInfo.sauce} className="form-select">
                        <option value=""disabled>Select a sauce!</option>
                        {
                            allDBSauces.map((sauceObj, idx)=>{
                                return(
                                    <option key={idx} data-price={sauceObj.price} value={sauceObj.name}>{sauceObj.name} - {sauceObj.price}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.sauce?.message}</p>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="">QTY:</label>
                    <input type="number" min="1" name="quantity" value={formInfo.quantity} className="form-control" onChange={changeHandler}/>
                    <p className="text-danger">{formErrors.quantity?.message}</p>
                </div> */}

                <h4>Toppings:</h4>
                {/* RE-SIZE THIS DIV TO CONTAIN ALL TOPPINGS WITH CHECKBOX */}
                <div className = "d-flex flex-column flex-wrap border align-items-center" style={{width: "800px", minHeight: "100px", maxHeight: "250px"}}>
                {
                    allDBToppings.map((toppingObj, idx)=>{
                        return (
                            <div
                            className="d-flex align-items-center"
                            key={idx}
                            style={{margin: "20px", gap: "10px"}}>
                                {/* <p className='text-success'>{toppingObj.checkedKey}</p> */}
                                <span className="align-middle" htmlFor="">{toppingObj.name}</span>
                                <input type="checkbox" data-price={toppingObj.price} name="toppings" onChange={(e)=>toggleToppings(e, toppingObj.name, toppingObj.checkedKey)} checked={toppingBooleans[toppingObj.checkedKey]} className="form-check-input" />
                            </div>
                        )
                    })
                }
                </div>

                    {/* <li className="pizza-options_topping">
                        <input type="checkbox" id={topping.name} className="pizza-options_topping-input" />
                        <label htmlFor={topping.name} className="pizza-options_topping-label">{topping.name}</label>
                    </li> */}

                <input type="submit" value={buttonValue} className='btn btn-success mt-3'/>

                <p className="text-danger">{formErrors.order_id?.message}</p>
            </form>
        </>
    );
}
export default PizzaForm;
