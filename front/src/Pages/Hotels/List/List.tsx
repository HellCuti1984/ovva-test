import React from 'react';
import s from './List.module.scss'
import {useGetHotelsQuery} from "../../../Services/HotelsService";
import {HotelCard} from "./components/HotelCard";
import {Loader} from "../../../Components/Loader";
import {IconButton, Tooltip} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {useAppSelector} from "../../../Hooks";
import {usePopupContext} from "../../../Components/Popup/usePopupContext";
import CreateHotel from "../Create/CreateHotel";

const List = () => {

    //@ts-ignore
    const {data: hotels, isSuccess: isSuccessGetHotels, isLoading: isLoadingGetHotels} = useGetHotelsQuery()
    const auth = useAppSelector(state => state.auth.user)

    const {setPopupContext} = usePopupContext()

    const handleCreateHotel = () => {
        setPopupContext({
            innerComponent: <CreateHotel/>
        })
    }

    return (
        <div className={s.hotelsList}>
            <div className={s.toolsButton}>
                {auth &&
                    <>
                        <Tooltip title="Добавить отель" arrow>
                            <IconButton onClick={handleCreateHotel} color="primary"
                                        aria-label="Добавить отель">
                                <AddCircleIcon/>
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </div>
            {isLoadingGetHotels && <Loader/>}
            {isSuccessGetHotels && hotels && hotels.map(h => <HotelCard key={h.id} {...h}/>)}
        </div>
    );
};

export default List;