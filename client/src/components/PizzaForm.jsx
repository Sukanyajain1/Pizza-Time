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
        buttonValue

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



    // this use effect is changing the total price of the pizza after every attempt of form change.
    // the base price is changed during the change handler and the topping handler
    // the base price is then used after the triggered useEffect to change the total price and the rendered display.
    // useEffect(() => {
    //     const {pizzaSize, crust, sauce, toppings} = basePrices
    //     setFormInfo({
    //         ...formInfo,
    //         price: (pizzaSize + crust + sauce + toppings)
    //     })
    // }, [formPieSize, formCrust, formSauce, formToppings]);

    // useEffect(() => {
    //     // creating the math for calculating price every time there is a form change
    //     const toppingsPrice = formToppings.reduce((total, topping) => {
    //         return total + (topping.checked ? topping.price : 0);
    //     }, 0);
        
    //         // Calculate the total price
    //     const newTotal = formPieSize + formCrust + formSauce + toppingsPrice;
    //     setTotalPrice(newTotal);
    // }, [formPieSize, formSauce, formCrust, formToppings]);




    // // changehandler to update the formInfo object with the information from the form
    // const changeHandler = (e)=>{
    //     console.log("changing the form!")
    //     const eventPrice = Number(e.target.dataset.price)
    //     setFormInfo({
    //             ...formInfo,
    //             [e.target.name]: e.target.value
    //     })

    //     setbasePrices({
    //         ...basePrices,
    //         [e.target.name]: eventPrice
    //     })
    //     console.log("EXITING THE CHANGE HANDLER")
    // }

    // const toggleToppings = (e, toppingId) => {
    //     if(e.target.type === "checkbox"){
    //         // const eventPrice = Number(e.target.dataset.price)
    //         // check if it is already added
    //         let newList = [];
    //         if(formInfo[e.target.name].includes(toppingId)) {
    
    //             // Remove the existing id 
    //             newList = formInfo[e.target.name].filter(item => item !== toppingId)
    //             setFormInfo({
    //                 ...formInfo,
    //                 [e.target.name]: newList
    //             })
    //         } else {
    //             newList = [...formInfo[e.target.name], toppingId]
    //             setFormInfo({
    //                 ...formInfo,
    //                 [e.target.name]: newList
    //             })
    //         }
    //         // setToppingBooleans({
    //         //     ...toppingBooleans,
    //         //     [oneToppingKey]: e.target.checked
    //         // })
    //         console.log("EXITING THE TOPPINGS HANDLER")

    //         return "Topping changes applied"
    //     } else{
    //         console.log("Something went wrong with toppingHandler in PizzaForm")
    //     }
    // };




// function that returns an object with the new form information in a const variable

    const functionNumber1_AXIOS = (e)=>{
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
            // document.querySelector(`option[value="${target.value}"]`).dataset.price
            const eventPrice = Number(document.querySelector(`option[value="${e.target.value}"]`).dataset.price)
            newFormInfo[e.target.name] = e.target.value
            newFormInfo.priceBreakdown[e.target.name]= eventPrice
            setbasePrices({
                ...basePrices,
                [e.target.name]: eventPrice
            })
        }else{         //THIS IS THE TOPPING HANDLER
            // let newList = [];
            const toppingId = e.target.dataset.id
            if(newFormInfo[e.target.name].includes(e.target.dataset.id)) {
    
                // Remove the existing id 
                newFormInfo[e.target.name] = newFormInfo[e.target.name].filter(item => item !== toppingId)

            } else {
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
        console.log("THIS IS THE NEW FORM INFO: ", newFormInfo)
        // const returnMsg = "the forms have been set"
        return newFormInfo
    }

//  the change handler is an asyn function that needs to wait for the first function to return a value into the new form const variable.
// the change handler is nested into




    const functionNumber2_FETCH = (e)=>{
        const newFormInfo = functionNumber1_AXIOS(e)
        const {pizzaSize, crust, sauce, toppings, priceBreakdown} = newFormInfo
        setFormInfo({
            pizzaSize: pizzaSize,
            crust: crust,
            sauce: sauce,
            toppings: toppings,
            price: (priceBreakdown.pizzaSize + priceBreakdown.crust + priceBreakdown.sauce + priceBreakdown.toppings)
        })
    }




// // all encapsulated within a major function that will house the function that it needs to call
//     const changeHandler_FINALBOSS = (e)=>{           //THIS IS THE FORM CHANGE HANDLER

//         const functionNumber2_FETCH = (e)=>{
//             const newFormInfo = functionNumber1_AXIOS(e)
//             const {pizzaSize, crust, sauce, toppings, priceBreakdown} = newFormInfo
//             setFormInfo({
//                 pizzaSize: pizzaSize,
//                 crust: crust,
//                 sauce: sauce,
//                 toppings: toppings,
//                 price: (priceBreakdown.pizzaSize + priceBreakdown.crust + priceBreakdown.sauce + priceBreakdown.toppings)
//             })
//         }
//         // make the async function first

//     // and then call it immediately after
//     // functionNumber2_FETCH(e)

//     // // set the total price
//     // const {pizzaSize, crust, sauce, toppings} = basePrices;
//     // setFormInfo({
//     //     ...formInfo,
//     //     total: (pizzaSize + crust + sauce + toppings)
//     // })

//     }


























    // const formHandler = (e, toppingId)=>{
    //     const eventPrice = Number(e.target.dataset.price)
    //     if (e.target.name!=="toppings"){
    //         changeHandler(e).then(()=>{
    //             // set all the base prices
    //             setbasePrices({
    //                 ...basePrices,
    //                 [e.target.name]: eventPrice
    //             })
    //             console.log("After the change handler: ")
    //         })
    //     }else{
    //         toggleToppings(e, toppingId).then((res)=>{
    //             // set all the base prices
    //             // allDBToppings.map((item)=>{
    //             //     formToppings.includes(item)?:0
    //             // })

    //             const total = allDBToppings.reduce(
    //                 (accumulator, currentValue) => accumulator + formToppings.includes(currentValue.name)? currentValue.price:0,
    //                 0
    //             );
    //             setbasePrices({
    //                 ...basePrices,
    //                 toppings: total
    //             })
    //             console.log("After the toppings handler: ", res)
    //         })
    //         // set all the total toppings price according to the formToppings list using nested for loop
    //     }
    // }


    // const allDBToppings = [1, 2, 3, 4];

    // // 0 + 1 + 2 + 3 + 4
    // const initialValue = 0;
    // const sumWithInitial = allDBToppings.reduce(
    //     (accumulator, currentValue) => accumulator + formToppings.includes(currentValue.price)? currentValue.price:0,
    //     initialValue
    // );



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
            {/* <input type="text" className="hidden" name="user_id" value={currentUser._id}/> */}
                <div className="form-group">
                    <label htmlFor="">Size: </label>
                    <select onChange= {functionNumber2_FETCH} name="pizzaSize" value={formPieSize} className="form-select">
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
                    <select onChange= {functionNumber2_FETCH} name="crust" value={formCrust} className="form-select">
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
                    <select onChange= {functionNumber2_FETCH} name="sauce" value={formSauce} className="form-select">
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
                                    onChange={functionNumber2_FETCH}
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
