import axios from 'axios';


// const verifyCurrentUser = ()=>{
//     console.log("ANOTHA ONEEEEEE!!!!!!!!!!!!!!!")
//     axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
//     .then(res=>{
//         console.log("res when getting logged in user", res)
//         if(res.data.results){
//             //this means the user is logged in and can accees this page
//             setCurrentUser(res.data.results)
//             console.log("This is the current user data: ", res.data.results);
//             return res.data.results;
//         }
//     })
//     .catch(err=>{
//         //this means someone who is not logged in tried to access the dashboard
//         console.log("err when getting logged in user", err);
//         // return err;
//     })

// }


const verifyCurrentUser = ()=>{
    console.log("ANOTHA ONEEEEEE!!!!!!!!!!!!!!!")
    axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
    .then(res=>{
        console.log("res when getting logged in user SERVICE", res)
        if(res.data.results){
            //this means the user is logged in and can accees this page
            // setCurrentUser(res.data.results)
            // console.log("This is the current user data: ", res.data.results);
            return res.data.results;
        }
    })
    .catch(err=>{
        // //this means someone who is not logged in tried to access the dashboard
        // console.log("err when getting logged in user", err);
        return err;
    })
}




const UserService = {
    verifyCurrentUser
};

export default UserService;