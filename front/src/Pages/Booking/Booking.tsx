import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import s from './Booking.module.scss'
import {Box, Button, ButtonGroup} from "@mui/material";
import {CustomTextField} from "../../Components/TextField";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {usePopupContext} from "../../Components/Popup/usePopupContext";
import {useStoreBookingMutation} from "../../Services/BookingService";
import {useAppDispatch} from "../../Hooks";
import {createNotifies} from "../../Store/NotifiesSlice";
import errorsToString from "../../Helpers/errors";
import {Loader} from "../../Components/Loader";

const schema = yup.object().shape({
    room_id: yup
        .number()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    customer_name: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    customer_email: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    start_date: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    end_date: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
});

const Booking = ({room_id}: { room_id: number }) => {

    const dispatch = useAppDispatch()

    const {setPopupContext} = usePopupContext()
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            room_id: room_id,
            customer_name: '',
            customer_email: '',
            start_date: '',
            end_date: ''
        },
        resolver: yupResolver(schema)
    });

    const [createBooking, {isLoading: isLoadingCreatingBooking}] = useStoreBookingMutation();

    const {handleSubmit} = methods;

    const handleCloseBookingForm = () => {
        setPopupContext({
            innerComponent: undefined
        })
    }

    const handleSubmitForm = (data: any) => {
        createBooking(data)
            .unwrap()
            .then(data => {
                dispatch(createNotifies({
                    type: 'success',
                    message: 'За вами забронирова номер!\nПисьмо выслано на почту с информацией',
                    time: 3000
                }))
                handleCloseBookingForm();
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

    return (
        <FormProvider {...methods}>
            {isLoadingCreatingBooking && <Loader/>}
            <div className={s.wrapper}>
                <div className={s.title}>
                    Забронировать номер
                </div>
                <div className={s.form}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleSubmitForm)}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <CustomTextField
                            type={"text"}
                            label={'ФИО'}
                            name={'customer_name'}
                        />
                        <CustomTextField
                            type={"text"}
                            label={'Email'}
                            name={'customer_email'}
                        />
                        <CustomTextField
                            type={"date"}
                            label={'С какого'}
                            name={'start_date'}
                        />
                        <CustomTextField
                            type={"date"}
                            label={'По какое'}
                            name={'end_date'}
                        />
                        <ButtonGroup
                            className={s.buttons}
                            sx={{mt: 1}}
                            size="small"
                            variant="contained"
                        >
                            <Button type={'submit'}>Забронированть</Button>
                            <Button onClick={handleCloseBookingForm}>Отмена</Button>
                        </ButtonGroup>
                    </Box>
                </div>
            </div>
        </FormProvider>
    );
};

export default Booking;