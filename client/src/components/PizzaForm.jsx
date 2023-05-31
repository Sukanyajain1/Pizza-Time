import React, { useEffect, useState } from 'react';
import axios from "axios";


const PizzaForm = (props) => {
    const {
        submitHandler,
        changeHandler,
        formInfo, setFormInfo,
        // formToppings, setFormToppings,
        toppingBooleans, setToppingBooleans,
        priceBreakdown, setPriceBreakdown,
        allDBToppings, setAllDBToppings,
        allDBCrusts, setAllDBCrusts,
        allDBPieSizes, setAllDBPieSizes,
        formErrors,
        buttonValue,
    } = props;
    

    const [tester, setTester] = useState([]);
    // const [selectedToppings, setSelectedToppings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/toppings")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllDBToppings(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });

        axios.get("http://localhost:8000/api/crusts")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllDBCrusts(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });

        axios.get("http://localhost:8000/api/pizzaSizes")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllDBPieSizes(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
    }, []);
    

    // const changeHandler = (e)=>{
    //     console.log("changing the form!")
    //     setFormInfo({
    //         ...formInfo,
    //         [e.target.name]: e.target.value
    //     });
        
    //     e.target.name === "crust"?
    //     crustPriceSetter()
    //     console.log("THE FORM INFO STATE VARIABLE: ", formInfo)
    // }

    const toggleToppings = (e, oneToppingName, oneToppingKey) => {
        if(e.target.type === "checkbox"){
            const eventPrice = Number(e.target.dataset.price)
            // check if it is already added
            if(formInfo[e.target.name].includes(oneToppingName)) {
    
                // Remove the existing id 
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: formInfo[e.target.name].filter(item => item != oneToppingName)
                })
                // const newVal = priceBreakdown[e.target.name] - eventPrice
                setPriceBreakdown({
                        ...priceBreakdown,
                        [e.target.name]: priceBreakdown[e.target.name] - eventPrice
                    })
            } else {
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: [...formInfo[e.target.name], oneToppingName]
                })
                // const newVal = priceBreakdown[e.target.name] + eventPrice
                setPriceBreakdown({
                    ...priceBreakdown,
                    [e.target.name]: priceBreakdown[e.target.name] + eventPrice              
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
            <h3>The console logger: {formInfo.toppings}</h3>
            <form onSubmit={submitHandler} action="" className="">
                <div className="form-group">
                    <label htmlFor="">Size: </label>
                    <select onChange= {changeHandler} name="pizzaSize" value={formInfo.pizzaSize} className="form-select">
                        <option value=""disabled>Select a pie size!</option>
                        {
                            allDBPieSizes.map((sizeObj, idx)=>{
                                return(
                                    <option key={idx} data-price={sizeObj.price} value={sizeObj.name}>{sizeObj.name}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.size?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Crust:</label>
                    <select onChange= {changeHandler} name="crust" value={formInfo.crust} className="form-select">
                        <option value=""disabled>Select a crust!</option>
                        {
                            allDBCrusts.map((crustObj, idx)=>{
                                return(
                                    <option key={idx} data-price={crustObj.price} value={crustObj.name}>{crustObj.name}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.crust?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">QTY:</label>
                    <input type="number" min="1" name="quantity" value={formInfo.quantity} className="form-control" onChange={changeHandler}/>
                    <p className="text-danger">{formErrors.quantity?.message}</p>
                </div>

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
            </form>
        </>
    );
}
export default PizzaForm;
