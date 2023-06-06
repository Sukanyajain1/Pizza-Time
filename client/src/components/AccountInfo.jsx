import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const AccountInfo = () => {
    const [currentUser, isLogged] = useOutletContext();

    return (
        <>
            {/* <h1>hello and welcome to the account info page</h1> */}
            <h1><u>Account Info:</u></h1>
            <h3><u>Name:</u> {currentUser.firstName}  {currentUser.lastName}</h3>
            <h3><u>Email:</u> {currentUser.email}</h3>
            <h3><u>Delivery Address:</u> </h3>
            <h3>{currentUser.streetAddress},  {currentUser.city}</h3>
            <h3>{currentUser.homeState}  {currentUser.zipCode}</h3>
        </>
    );
}

export default AccountInfo;