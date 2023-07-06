import React from 'react'

import s from './LoaderIngru.module.scss'

const LoaderIngru = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.main_div}>
                <div className={s.first}/>
                <div className={s.second}/>
                <div className={s.third}/>
                <div className={s.fourth}/>
            </div>
        </div>
    )
}

export default LoaderIngru