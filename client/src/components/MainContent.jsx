import React from 'react';

import { Outlet } from "react-router-dom";


const MainContent = () => {
    
    // const [loggedUser, setLoggedUser] = useState({})
    // const  = props;
    // const navigate = useNavigate()

    // context={[loggedUser]}

    return (
        <>
            {/* <h1>hello all</h1>
            <h3>{currentUser.firstName}</h3> */}
            <Outlet />
        </>
    );
}

export default MainContent;