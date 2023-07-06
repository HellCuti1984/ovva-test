import React from 'react';
import Notify from './Notify'
/*STYLES AND COMPONENTS*/
import s from './Notifies.module.scss'
import {useAppSelector} from "../../Hooks";
import {INotify} from "../../Models/INotify";

const Notifies = () => {
    let notifies = useAppSelector(state => state.notifies.notifies)

    return (
        <div className={s.notifiesBlock}>
            {notifies.map((notify: INotify) =>
                <Notify key={notify.id} {...notify}/>
            )}
        </div>
    );
};

export default Notifies;
