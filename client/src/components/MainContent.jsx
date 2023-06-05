import React from 'react';

import { Outlet } from "react-router-dom";
import WithAuth from './WithAuth';


const MainContent = ({currentUser, isLogged}) => {
    // authToggle, setAuthToggle
    // context={[loggedUser]}

    return (
        <>
            {/* <h1>hello all</h1>
            <h3>{currentUser.firstName}</h3> */}
            <Outlet context={[currentUser, isLogged]}/>
        </>
    );
}

export default WithAuth(MainContent);