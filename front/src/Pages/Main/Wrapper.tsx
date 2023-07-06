import React from 'react';
import Header from "../../Components/Header/Header";
import {Outlet} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import './Wrapper.module.scss'
import {Popup} from "../../Components/Popup";

const Wrapper = () => {
    return (
        <Popup>
            <Header/>
            <Outlet/>
        </Popup>
    );
};

export default Wrapper;