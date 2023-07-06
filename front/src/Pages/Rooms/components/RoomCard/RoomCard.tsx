import React from 'react';

import {IRoom} from "../../../../Models/IRoom";
import {Box, Button, CardActions, CardContent, Tooltip, Typography} from "@mui/material";
import {usePopupContext} from "../../../../Components/Popup/usePopupContext";
import {Booking} from "../../../Booking";
import {RoomForm} from "../RoomForm";
import {useAppDispatch, useAppSelector} from "../../../../Hooks";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddCardIcon from '@mui/icons-material/AddCard';
import {useDeleteRoomMutation} from "../../../../Services/RoomsService";
import {createNotifies} from "../../../../Store/NotifiesSlice";
import errorsToString from "../../../../Helpers/errors";

const BoxStyle = {
    maxWidth: 'inherit',
    background: '#ffffff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px'
}

const DesciptionTypographyStyle = {
    height: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

const RoomCard = ({
                      id,
                      number,
                      price,
                      description,
                      capacity,
                      deleted_at,
                      hotels_id,
                      updated_at,
                      created_at
                  }: IRoom) => {

    const dispatch = useAppDispatch()

    const auth = useAppSelector(state => state.auth)

    const {setPopupContext} = usePopupContext()

    const [deleteRoom] = useDeleteRoomMutation();

    const handleUpdateRoom = () => {
        setPopupContext({
            //@ts-ignore
            innerComponent: <RoomForm room={{
                id: id,
                number: number,
                price: price,
                description: description,
                capacity: capacity,
                hotels_id: hotels_id,
                deleted_at: deleted_at,
                updated_at: updated_at,
                created_at: created_at

            }}/>
        })
    }

    const handleDeleteRoom = () => {
        deleteRoom(id)
            .unwrap()
            .then(data => {
                dispatch(createNotifies({
                    type: 'success',
                    message: 'Комната успешно удалена',
                    time: 3000
                }))
            })
            .catch(data => {
                if (data.data.errors || data.data.error) {
                    dispatch(createNotifies({
                        type: 'error',
                        message: errorsToString(data.data.errors || data.data.error),
                        time: 3000
                    }))
                } else
                    dispatch(createNotifies({
                        type: 'error',
                        message: 'Внутреняя ошибка. Попробуйте позже',
                        time: 3000
                    }))
            })
    }

    const handleBookingPopup = () => {
        setPopupContext({
            innerComponent: <Booking room_id={id as number}/>
        })
    }

    return (
        <Box sx={BoxStyle}>
            <CardContent>
                <Typography sx={{mb: 1.5, fontSize: '16px'}} gutterBottom>
                    Номер комнаты: {number}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{mb: 1.5, fontSize: '14px'}}>
                    Цена: {price} ₽
                </Typography>
                <Typography sx={{mb: 1.5, fontSize: '14px'}}>
                    Спальных мест: {capacity}
                </Typography>
                <Typography sx={DesciptionTypographyStyle}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Забронировать номер" arrow>
                    <Button variant={'contained'} size="small" onClick={handleBookingPopup}>
                        <AddCardIcon/>
                    </Button>
                </Tooltip>
                {auth && <>
                    <Tooltip title="Редактировать" arrow>
                        <Button variant={'contained'} size="small" onClick={handleUpdateRoom}>
                            <EditIcon/>
                        </Button>
                    </Tooltip>

                    <Tooltip title="Удалить" arrow>
                        <Button variant={'contained'} size="small"
                                onClick={handleDeleteRoom}>
                            <DeleteForeverIcon/>
                        </Button>
                    </Tooltip>
                </>}
            </CardActions>
        </Box>
    );
};

export default RoomCard;