import React from 'react';
import {Rooms} from "../Rooms";
import Wrapper from "./Wrapper";
import {Hotels} from "../Hotels";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const Main = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper/>}>
                    <Route path="/" element={<Hotels/>}>
                        <Route path={':id/rooms'} element={<Rooms/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Main;