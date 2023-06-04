import axios from 'axios';
import DataService from '../services/data.service'


const getOnePizza = (_id)=>{
    axios.get(`http://localhost:8000/api/pizzas/show_one/${_id}`)
}

const submitNewPizza = (formInfo)=>{
    axios.post("http://localhost:8000/api/pizzas/new", formInfo)
}

const submitUpdatePizza = (formInfo, _id)=>{
    axios.put(`http://localhost:8000/api/expenses/update/${_id}`, formInfo)
}    

const sumTotalPrice = async (priceObj)=>{
    let {pizzaSize, crust, sauce, toppings, total} = priceObj
    total = (pizzaSize*10 + sauce*10 + toppings*10 + crust*10) /10
    return total
}

const toppingIsChecked= (toppingsArray)=>{
    let toppingBooleans = {
        isPepperoni: false,
        isChicken: false,
        isGroundBeef: false,
        isOlives: false,
        isOnions: false,
        isMushroom: false,
        isPineapple: false,
        isBellPeppers: false,
        isSpinach: false
    }
    console.log(toppingsArray)
    if (toppingsArray.length !==0){
        toppingsArray.map((oneTopping)=>{
            DataService.getAllDBToppings.map((item)=>{
                if (oneTopping === item.name){
                    toppingBooleans[item.checkedKey] = !toppingBooleans[item.checkedKey]
                }
            })
        })
    }
    return toppingBooleans
}
// const  create a price total sum handler for the submission
// add the function to the change handler and the topping handler so that it gets executed everytime there is a change to the formInfo ---> redundant?

const PizzaService = {
    getOnePizza,
    submitNewPizza,
    submitUpdatePizza,
    sumTotalPrice,
    toppingIsChecked
};

export default PizzaService;