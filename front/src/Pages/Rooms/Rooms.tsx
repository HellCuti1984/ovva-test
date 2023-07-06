import React, {useEffect} from 'react';

import s from './Rooms.module.scss'
import {RoomCard, RoomForm} from "./components";
import {Filter} from "../Filter";
import {useAppSelector} from "../../Hooks";
import {Loader} from "../../Components/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {useGetRoomsByHotelIdQuery} from "../../Services/RoomsService";
import {IconButton, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {usePopupContext} from "../../Components/Popup/usePopupContext";

const Rooms = () => {

    const navigate = useNavigate()
    const params = useParams();

    const auth = useAppSelector(state => state.auth.user)
    const filter = useAppSelector(state => state.filter.filter)

    const {setPopupContext} = usePopupContext()

    const handleCreateRoom = () => {
        setPopupContext({
            //@ts-ignore
            innerComponent: <RoomForm/>
        })
    }

    const handleCloseListRooms = () => navigate('/')

    const {
        data: rooms,
        isSuccess: isSuccessGettingRooms,
        isLoading: isLoadingGettingRooms,
        refetch
    } = useGetRoomsByHotelIdQuery({
        // @ts-ignore
        hotel_id: parseInt(params.id),
        priceMin: filter.priceMin,
        priceMax: filter.priceMax,
        capacityMin: filter.capacityMin,
        capacityMax: filter.capacityMax,
    });

    useEffect(() => {
        refetch()
    }, [rooms, filter])

    return (
        <div className={s.wrapper}>
            <Filter/>
            <div className={s.rooms}>
                <div className={s.list}>
                    <div className={s.toolsButton}>
                        {auth &&
                            <>
                                <Tooltip title="Добавить комнату" arrow>
                                    <IconButton onClick={handleCreateRoom} color="primary"
                                                aria-label="Добавить комнату">
                                        <AddCircleIcon/>
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                        <Tooltip title="Закрыть список" arrow>
                            <IconButton onClick={handleCloseListRooms} color="primary" aria-label="Закрыть список">
                                <CloseIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={s.cards}>
                        {isLoadingGettingRooms && <Loader/>}
                        {isSuccessGettingRooms &&
                            rooms.map(r => <RoomCard key={r.id} {...r}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Rooms;