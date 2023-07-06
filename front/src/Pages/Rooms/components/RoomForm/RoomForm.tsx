import React from 'react';
import * as yup from "yup";
import {Box, Button, ButtonGroup} from "@mui/material";
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {CustomTextField} from "../../../../Components/TextField";
import {useAppDispatch, useAppSelector} from "../../../../Hooks";
import {usePopupContext} from "../../../../Components/Popup/usePopupContext";
import {createNotifies} from "../../../../Store/NotifiesSlice";
import errorsToString from "../../../../Helpers/errors";
import {yupResolver} from "@hookform/resolvers/yup";
import {useParams} from "react-router-dom";
import {
    useGetRoomsByHotelIdQuery, useGetRoomsQuery, useLazyGetRoomsQuery,
    useStoreRoomMutation,
    useUpdateRoomMutation
} from "../../../../Services/RoomsService";
import {Loader} from "../../../../Components/Loader";
import {IRoom, IRoomForm} from "../../../../Models/IRoom";

const schema = yup.object().shape({
    hotels_id: yup
        .number()
        .typeError("Поле обязательно к заполнению!"),
    number: yup
        .number()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    price: yup
        .number()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    capacity: yup
        .number()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    description: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
});

const RoomForm = ({room}: { room?: IRoom }) => {

    const params = useParams()

    const dispatch = useAppDispatch()

    const {setPopupContext} = usePopupContext()
    const methods = useForm<IRoomForm>({
        mode: "onChange",
        defaultValues: {
            // @ts-ignore
            hotels_id: params.id,
            number: room ? room.number : 0,
            price: room ? room.price : 0,
            capacity: room ? room.capacity : 0,
            description: room ? room.description : ''
        },
        resolver: yupResolver(schema)
    });

    const {handleSubmit} = methods;

    const [createRoom, {isLoading: isLoadingCreatingRoom}] = useStoreRoomMutation();
    const [updateRoom, {isLoading: isLoadingUpdatingRoom}] = useUpdateRoomMutation();

    const handleCloseRoomForm = () => {
        setPopupContext({
            innerComponent: undefined
        })
    }

    const handleCreateRoom = (data: IRoomForm) => {
        createRoom(data)
            .unwrap()
            .then(data => {
                dispatch(createNotifies({
                    type: 'success',
                    message: 'Комната успешно создана',
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

    const handleUpdateRoom = (data: IRoom) => {
        updateRoom(Object.assign({...data}, {id: room?.id}))
            .unwrap()
            .then(data => {
                dispatch(createNotifies({
                    type: 'success',
                    message: 'Комната успешно создана',
                    time: 3000
                }))
                handleCloseRoomForm();
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

    const handleSubmitForm = (data: IRoomForm) => {
        if (!room)
            handleCreateRoom(data)
        else
            handleUpdateRoom(data as IRoom)
    }

    return (
        <FormProvider {...methods}>
            {(isLoadingCreatingRoom || isLoadingUpdatingRoom) && <Loader/>}
            <div>
                Создать комнату
            </div>
            <div>
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleSubmitForm)}
                    noValidate
                    sx={{mt: 1}}
                >
                    <CustomTextField
                        type={"text"}
                        label={'Номер комнаты'}
                        name={'number'}
                    />
                    <CustomTextField
                        type={"number"}
                        label={'Цена'}
                        name={'price'}
                    />
                    <CustomTextField
                        type={"number"}
                        label={'Вместимость'}
                        name={'capacity'}
                    />
                    <CustomTextField
                        type={"text"}
                        label={'Описание'}
                        name={'description'}
                    />
                    <ButtonGroup
                        sx={{mt: 1}}
                        size="small"
                        variant="contained"
                    >
                        <Button type={'submit'}>{room ? 'Обновить' : 'Создать'} комнату</Button>
                        <Button onClick={handleCloseRoomForm}>Отмена</Button>
                    </ButtonGroup>
                </Box>
            </div>
        </FormProvider>
    );
};

export default RoomForm;