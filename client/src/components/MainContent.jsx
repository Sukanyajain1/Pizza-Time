import React from 'react';

import { Outlet } from "react-router-dom";


const MainContent = ({currentUser, authToggle, setAuthToggle, isLoading, isLogged}) => {
    // authToggle, setAuthToggle
    // context={[loggedUser]}

    return (
        <>
            {/* <h1>hello all</h1>
            <h3>{currentUser.firstName}</h3> */}
            <Outlet context={[currentUser, authToggle, setAuthToggle, isLoading, isLogged]}/>
        </>
    );
}

export default MainContent;