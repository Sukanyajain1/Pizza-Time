import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useNavigate, Outlet, useOutletContext, useParams } from "react-router-dom";

const PizzaRoute = () => {
    const [currentUser, isLogged] = useOutletContext();
    const {_id} = useParams();

    // const {pizzaSize: formPieSize, sauce: formSauce, crust: formCrust, toppings: formToppings} = formInfo;
    // const [allDBSauces, setAllDBSauces] = useState([]);
    // const [allDBToppings, setAllDBToppings] = useState([]);
    // const [allDBCrusts, setAllDBCrusts] = useState([]);
    // const [allDBPieSizes, setAllDBPieSizes] = useState([]);

    const [isFetched, setIsFetched] = useState(false);

    const [allDBSauces, setAllDBSauces] = useState([]);
    const [allDBToppings, setAllDBToppings] = useState([]);
    const [allDBCrusts, setAllDBCrusts] = useState([]);
    const [allDBPieSizes, setAllDBPieSizes] = useState([]);

    const BASE_URL = 'http://localhost:8000/api';



// THIS DOES NOT WORK!!!!!! ERROR SHOWS THAT THE EDIT COMPONENT CANNOT READ .MAP FUNCTION

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
                console.log("PIZZA ROUTER AXIOS CALL")
                setIsFetched(true)

            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };
    
        fetchIngredients();
        console.log("THIS IS THE PIZZA ROUTER COMPONENT")
    }, []);

    // useEffect(() => {
    //     console.log("THIS IS THE PIZZA ROUTER")
    // }, []);


// , allDBSauces, allDBToppings, allDBCrusts, allDBPieSizes



    if(isFetched){
    return (
        <>
            {console.log("this is the pizza route RENDER")}
            <Outlet context={[currentUser, isLogged, allDBSauces, allDBToppings, allDBCrusts, allDBPieSizes]}/>
        </>
    );
    }
}

export default PizzaRoute;