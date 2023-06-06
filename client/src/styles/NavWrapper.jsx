import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom'

//  Creating a button styled-component that will render a button with some styles.

const NavWrapper = styled.div`
    // display: flex;

    a {
        text-decoration: none;
        // color: hotpink;
        margin: 0 1.2rem;
        font-size: 1.3rem;
        position: relative;
        &:hover{
            text-decoration: underline;
        }
        &:focus{
            // color: blue;
            // font-weight: bold;
        };
        &:active{
            // text-decoration: underline;
};
    }

    // .inactive {
    //     color: red;
    //     margin: 0 0.8rem;
    //     font-size: 1.3rem;
    //     position: relative;
    //     list-style: none;
    // }

    .active-style {
        font-weight: bold;
        // border-bottom: 2px solid black;
        // text-decoration: underline;
    }
`;

export default NavWrapper;