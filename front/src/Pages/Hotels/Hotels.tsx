import React from 'react';

import {List} from "./List";
import {Outlet} from "react-router-dom";
import MapWrapper from "./Map/MapWrapper";

import s from './Hotels.module.scss'

const Hotels = () => {

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                <List/>
            </div>
            <Outlet/>
            <div className={s.map}>
                <MapWrapper/>
            </div>
        </div>
    );
};

export default Hotels;