import React from 'react';

import s from './Auth.module.scss'
import {usePopupContext} from "../../../Components/Popup/usePopupContext";
import {Login} from "./Login";
import {Registration} from "./Registration";
import {useAppDispatch, useAppSelector} from "../../../Hooks";
import {deleteAuth} from "../../../Store/AuthSlice";

const Auth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user)
    const {setPopupContext} = usePopupContext()

    const handleLoginPopup = () => {
        setPopupContext({
            innerComponent: <Login/>
        })
    }

    const handleRegistrationPopup = () => {
        setPopupContext({
            innerComponent: <Registration/>
        })
    }

    const handleLogout = () => {
        dispatch(deleteAuth(null))
    }

    return (
        <div className={s.auth}>
            {user
                ? <div onClick={handleLogout}>Выход</div>
                : <>
                    <div onClick={handleLoginPopup}>Вход</div>
                    <div onClick={handleRegistrationPopup}>Регистрация</div>
                </>
            }
        </div>
    );
};

export default Auth;