import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useNavigate, Outlet, useOutletContext } from "react-router-dom";





const PizzaRoute = () => {
    const [currentUser, authToggle, setAuthToggle, isLoading, isLogged] = useOutletContext();

    return (
        <>
            <Outlet context={[currentUser, authToggle, setAuthToggle, isLoading, isLogged]}/>
        </>
    );
}

export default PizzaRoute;