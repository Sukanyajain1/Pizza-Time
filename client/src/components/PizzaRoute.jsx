import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useNavigate, Outlet, redirect } from "react-router-dom";





const PizzaRoute = () => {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default PizzaRoute;