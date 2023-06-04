import axios from 'axios';

const getAllDBToppings = ()=>{
    axios.get("http://localhost:8000/api/toppings")
    .then((res)=>{
        console.log("This is the api result: ", res);
        return res.data.results
    })
    .catch(err=>{
        return(err);
    });
}


const getAllDBCrusts = ()=>{
    axios.get("http://localhost:8000/api/crusts")
        .then((res)=>{
            console.log("This is the api result: ", res);
            return res.data.results 
        })
        .catch(err=>{
            return("Axios error: ", err);
        });
    }


const getAllDBPieSizes = ()=>{
    axios.get("http://localhost:8000/api/pizzaSizes")
        .then((res)=>{
            console.log("This is the api result: ", res);
            return res.data.results
        })
        .catch(err=>{
            return("Axios error: ", err);
        });
    }


    
    const DataService = {
        getAllDBToppings,
        getAllDBCrusts,
        getAllDBPieSizes,
    };
    
    export default DataService;