import axios from 'axios';


const getAllDBToppings = ()=>{
    axios.get("http://localhost:8000/api/toppings")
    .then((res)=>{
        console.log("This is the api result: ", res);
        return(res.data.results)
    })
    .catch(err=>{
        return("Axios error: ", err);
    });
}


const getAllDBCrusts = ()=>{
    axios.get("http://localhost:8000/api/crusts")
        .then((res)=>{
            console.log("This is the api result: ", res);
            return(res.data.results)
        })
        .catch(err=>{
            return("Axios error: ", err);
        });
    }

const getAllDBPieSizes = ()=>{
    axios.get("http://localhost:8000/api/pizzaSizes")
        .then((res)=>{
            console.log("This is the api result: ", res);
            return(res.data.results)
        })
        .catch(err=>{
            return("Axios error: ", err);
        });
    }

const submitHandler = (e, formInfo, submitEndpoint)=>{
    e.preventDefault();
    axios.post(`http://localhost:8000/api/pizzas/${submitEndpoint}`, formInfo)
    .then((res)=>{
        console.log("Response after axios put request: ", res);
        if(res.data.error){
            // this means there are validation errors we need to save
            return(res.data.error.errors);
        }else{
            return res;
        }
    })
    .catch(err=>{
        return("Axios POST Route error: ", err)
    })
}





const PizzaService = {
    getAllDBToppings,
    getAllDBCrusts,
    getAllDBPieSizes,
    submitHandler,
};

export default PizzaService;