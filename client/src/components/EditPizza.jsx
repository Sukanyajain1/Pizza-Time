import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import PizzaForm from './PizzaForm';
import axios from "axios";




const EditExpense = () => {


    const [currentUser, isLogged, allDBSauces, allDBToppings, allDBCrusts, allDBPieSizes] = useOutletContext();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    const {_id} = useParams();



    // formInfo will be filled with info about the ninja we want to update
    const [formInfo, setFormInfo] = useState({});
    const [basePrices, setBasePrices] = useState({});
    
    const priceSetter = (formData)=>{
        // this function will return an object of base prices to set in the state variable 
        let newPrices = {
            pizzaSize: 0,
            crust: 0,
            sauce: 0,
            toppings: 0
        }
        console.log("STARTING THE PRICE SETTER")
        
        // =====================================================================================
        // PIZZA SIZE
        // =====================================================================================
        allDBPieSizes.map((sizeObj)=>{
            sizeObj._id===formData.pizzaSize?
            newPrices.pizzaSize = sizeObj.price :
            console.log("size price was not: ", sizeObj.price)
        })
        // =====================================================================================
        // CRUST
        // =====================================================================================
        allDBCrusts.map((crustObj)=>{
            crustObj._id===formData.crust?
            newPrices.crust = crustObj.price :
            console.log("crust price was not: ", crustObj.price)
        })
        // =====================================================================================
        // SAUCE
        // =====================================================================================
        allDBSauces.map((sauceObj)=>{
            sauceObj._id===formData.sauce?
            newPrices.sauce = sauceObj.price :
            console.log("sauce price was not: ", sauceObj.price)
        })
        // =====================================================================================
        // TOPPINGS
        // =====================================================================================
        
        newPrices.toppings = Number(formData.price - newPrices.pizzaSize - newPrices.crust - newPrices.sauce - newPrices.toppings)
        
        
        console.log("THIS IS THE NEW SIZE PRICE: ", newPrices.pizzaSize);
        console.log("THIS IS THE NEW CRUST PRICE: ", newPrices.crust);
        console.log("THIS IS THE NEW SAUCE PRICE: ", newPrices.sauce);
        console.log("THIS IS THE NEW TOPPINGS PRICE: ", newPrices.toppings);
        
        return newPrices
        
    }
    
    
    const BASE_URL = 'http://localhost:8000/api';
    
    useEffect(() => {
        
        const fetchOnePizza = async () => {
            try {
                const pizzaResponse = await axios.get(`${BASE_URL}/pizzas/show_one/${_id}`);
                
                
                setFormInfo(pizzaResponse.data.results);
                console.log("THIS IS THE PIZZA RESULT INFO: ", pizzaResponse)
                const newPrices = priceSetter(pizzaResponse.data.results)
                setBasePrices(newPrices)
                setIsFetched(true)
                
            } catch (err) {
                console.error('Axios error fetching edit pizza form info:', err);
            }
        };
        
        fetchOnePizza();
        console.log("THIS IS THE NEW BASE PRICE OUTSIDE THE EDIT FETCH: ", basePrices)
        console.log("DB toppings list OUTSIDE EDIT FETCH: ", allDBToppings);

    }, []);




    
    const submitHandler = (e)=>{
        e.preventDefault();

        axios.put(`http://localhost:8000/api/pizzas/${_id}`, formInfo)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
            navigate("/pizza-time/order-summary");        //redirect after updataing form
            window.location.reload();
        
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })

    }    

    if (isFetched){
        return (
            <>
                <h3>Edit an Expense</h3>
                {console.log("this is the edit pizza RENDER")}
                <div>
                    <div className="row">
                        <div className="col" style={{maxWidth: "800px",}}>
                            <PizzaForm
                                submitHandler={submitHandler}
                                formInfo={formInfo}
                                setFormInfo={setFormInfo}
                                basePrices={basePrices}
                                setBasePrices={setBasePrices}
                                priceSetter={priceSetter}

                                allDBSauces={allDBSauces}
                                allDBToppings={allDBToppings}
                                allDBCrusts={allDBCrusts}
                                allDBPieSizes={allDBPieSizes}

                                formErrors={formErrors}
                                buttonValue = "ADD TO ORDER">
                            </PizzaForm>
                        </div>

                        <div className="col" style={{width: "800px",}}>
                            <h1 className="">Total Price:</h1>
                            <h1 className="">{formInfo.price.toFixed(2)}</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EditExpense;