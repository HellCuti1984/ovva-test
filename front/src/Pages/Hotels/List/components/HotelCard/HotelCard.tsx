import React from 'react';

import s from './HotelCard.module.scss'
import {Button} from "@mui/material";
import {HotelInterface} from "../../../../../Models";
import {useNavigate} from 'react-router-dom';

const HotelCard = ({id, address, name, description}: HotelInterface) => {

    const navigate = useNavigate()

    const handleNavigateToRoomsList = () => {
        navigate(`${id}/rooms`)
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <div className={s.title}>
                    <span>{name}</span>
                </div>
            </div>
            <img className={s.logo}
                 src={"https://cdn.worldota.net/t/640x400/extranet/da/d0/dad022f37cf5ddd737b2facb00f741e8f046d9a3.jpeg"}/>
            <div className={s.footer}>
                <Button
                    color={"primary"}
                    variant={'contained'}
                    onClick={handleNavigateToRoomsList}
                >Подробрее</Button>
            </div>
        </div>
    );
};

export default HotelCard;