import React from 'react';

import s from './Header.module.scss'
import Auth from "../../Pages/Main/components/Auth";

const Header = () => {

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <h2>Гостиницы</h2>
            </div>
            <div className={s.tools}>
                <Auth/>
            </div>
        </div>
    );
};

export default Header;