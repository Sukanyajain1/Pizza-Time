import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useNavigate, Outlet, useOutletContext } from "react-router-dom";





const PizzaRoute = () => {
    const [currentUser, componentDidMount, isLogged] = useOutletContext();

    return (
        <>
            <Outlet context={[currentUser, componentDidMount, isLogged]}/>
        </>
    );
}

export default PizzaRoute;