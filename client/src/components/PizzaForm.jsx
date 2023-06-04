import React, { useEffect, useState } from 'react';
import axios from "axios";



const PizzaForm = (props) => {
    const {
        submitHandler,
        // changeHandler,
        formInfo, setFormInfo,
        // formToppings, setFormToppings,
        totalPrice, setTotalPrice,
        toppingBooleans, setToppingBooleans,
        // priceBreakdown, setPriceBreakdown,
        formErrors,
        buttonValue,
        currentUser

    } = props;
    
    const {pizzaSize: formPieSize, sauce: formSauce, crust: formCrust, toppings: formToppings} = formInfo;
    const [allDBSauces, setAllDBSauces] = useState([]);
    const [allDBToppings, setAllDBToppings] = useState([]);
    const [allDBCrusts, setAllDBCrusts] = useState([]);
    const [allDBPieSizes, setAllDBPieSizes] = useState([]);

    const [basePrices, setbasePrices] = useState({
        pizzaSize: 0,
        crust: 0,
        sauce: 0,
        toppings: 0
    });

    const BASE_URL = 'http://localhost:8000/api';


    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const sizeResponse = await axios.get(`${BASE_URL}/pizzaSizes`);
                const crustResponse = await axios.get(`${BASE_URL}/crusts`);
                const sauceResponse = await axios.get(`${BASE_URL}/sauces`);
                const toppingsResponse = await axios.get(`${BASE_URL}/toppings`);
        
                setAllDBPieSizes(sizeResponse.data.results);
                setAllDBCrusts(crustResponse.data.results);
                setAllDBSauces(sauceResponse.data.results);
                setAllDBToppings(toppingsResponse.data.results);

            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };
    
        fetchIngredients();
    }, []);


// function that returns an object with the new form information in a const variable
    const functionNumber1_NEWFORM_OBJ = (e)=>{
        // this function will return a const variable containing the new formInfo object (not the state variable, but a new object that contains all the new info for it)
        const {pizzaSize: a, crust: b, sauce: c, toppings: d} = formInfo
        const {pizzaSize: w, crust: x, sauce: y, toppings: z} = basePrices
        
        let newFormInfo = {
            pizzaSize: a,
            crust: b,
            sauce: c,
            toppings: d,
            priceBreakdown: {
                pizzaSize: w,
                crust: x,
                sauce: y,
                toppings: z,
            }
        }
        
        if (e.target.type !== "checkbox"){       //THIS IS THE CHANGE HANDLER FOR THE DROPDOWS
            const eventPrice = Number(document.querySelector(`option[value="${e.target.value}"]`).dataset.price)
            newFormInfo[e.target.name] = e.target.value
            newFormInfo.priceBreakdown[e.target.name]= eventPrice
            setbasePrices({
                ...basePrices,
                [e.target.name]: eventPrice
            })
        }else{         //THIS IS THE TOPPING HANDLER
            const toppingId = e.target.dataset.id
            if(newFormInfo[e.target.name].includes(e.target.dataset.id)) {
    
                // Remove the existing id 
                newFormInfo[e.target.name] = newFormInfo[e.target.name].filter(item => item !== toppingId)

            } else {
                // Add new id
                newFormInfo[e.target.name] = [...newFormInfo[e.target.name], toppingId]
            }

            //caluclate the price of the toppings list
            let newToppingPrice = allDBToppings.reduce((total, topping) =>
                total + (newFormInfo["toppings"].includes(topping._id)? topping.price : 0),
                0
            );
            newFormInfo.priceBreakdown[e.target.name] = newToppingPrice;

            setbasePrices({
                ...basePrices,
                [e.target.name]: newToppingPrice
            })
        }
        // console.log("THIS IS THE NEW FORM INFO: ", newFormInfo)
        return newFormInfo
    }

    const functionNumber2_FINALBOSS = (e)=>{
        const newFormInfo = functionNumber1_NEWFORM_OBJ(e)
        const {pizzaSize, crust, sauce, toppings, priceBreakdown} = newFormInfo
        setFormInfo({
            ...formInfo,
            pizzaSize: pizzaSize,
            crust: crust,
            sauce: sauce,
            toppings: toppings,
            price: (priceBreakdown.pizzaSize + priceBreakdown.crust + priceBreakdown.sauce + priceBreakdown.toppings)
        })
        console.log("THIS IS THE NEW FORM INFO: ", formInfo)

    }


    return (
        <>
            <div className="row">
                <div className="col">
                    <h2 className="float-center">CRAFT-A-PIZZA</h2>
                </div>
                <div className="col">
                    <h3>Total Price $ {formInfo.price}</h3>
                </div>
            </div>
            {/* <h3>The console logger: {formInfo.toppings}</h3> */}
            <form onSubmit={submitHandler} action="" className="">
                <div className="form-group">
                    <label htmlFor="">Size: </label>
                    <select onChange= {functionNumber2_FINALBOSS} name="pizzaSize" value={formPieSize} className="form-select">
                        <option value=""disabled>Select a pie size!</option>
                        {
                            allDBPieSizes.map((sizeObj, idx)=>{
                                return(
                                    <option key={idx} data-price={sizeObj.price} value={sizeObj._id}>{sizeObj.name} - {sizeObj.price}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.pizzaSize?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Crust:</label>
                    <select onChange= {functionNumber2_FINALBOSS} name="crust" value={formCrust} className="form-select">
                        <option value=""disabled>Select a crust!</option>
                        {
                            allDBCrusts.map((crustObj, idx)=>{
                                return(
                                    <option key={idx} data-price={crustObj.price} value={crustObj._id}>{crustObj.name} - {crustObj.price}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.crust?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Sauce:</label>
                    <select onChange= {functionNumber2_FINALBOSS} name="sauce" value={formSauce} className="form-select">
                        <option value=""disabled>Select a sauce!</option>
                        {
                            allDBSauces.map((sauceObj, idx)=>{
                                return(
                                    <option
                                        key={idx}
                                        data-price={sauceObj.price}
                                        value={sauceObj._id}>
                                            {sauceObj.name} - {sauceObj.price}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <p className="text-danger">{formErrors.sauce?.message}</p>
                </div>

                <h4>Toppings:</h4>
                {/* RE-SIZE THIS DIV TO CONTAIN ALL TOPPINGS WITH CHECKBOX */}
                <div className = "d-flex flex-column flex-wrap border align-items-center" style={{ minHeight: "100px", maxHeight: "250px"}}>
                {
                    allDBToppings.map((toppingObj, idx)=>{
                        return (
                            <div
                            className="d-flex align-items-center"
                            key={idx}
                            style={{margin: "20px", gap: "10px"}}>
                                {/* <p className='text-success'>{toppingObj.checkedKey}</p> */}
                                <span className="align-middle" htmlFor="">{toppingObj.name}</span>
                                <input
                                    type="checkbox"
                                    name="toppings"
                                    data-id={toppingObj._id}
                                    onChange={functionNumber2_FINALBOSS}
                                    checked={formToppings[idx]?.checked}
                                    className="form-check-input" />
                            </div>
                        )
                    })
                }
                </div>

                <input type="submit" value={buttonValue} className='btn btn-success mt-3'/>

                <p className="text-danger">{formErrors.order_id?.message}</p>
            </form>
        </>
    );
}
export default PizzaForm;
