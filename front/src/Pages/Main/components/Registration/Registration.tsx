import React, {useEffect} from 'react';
import s from './Registration.module.scss'

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Button, ButtonGroup} from "@mui/material";
import {CustomTextField} from '../../../../Components/TextField';
import {usePopupContext} from "../../../../Components/Popup/usePopupContext";
import {useRegistrationMutation} from "../../../../Services/AuthService";
import {useAppDispatch, useAppSelector} from "../../../../Hooks";
import {saveAuth} from "../../../../Store/AuthSlice";
import {Loader} from "../../../../Components/Loader";

const schema = yup.object().shape({
    last_name: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    first_name: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    second_name: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    email: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    password: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
});

const Registration = () => {

    const dispatch = useAppDispatch();

    const auth = useAppSelector(state => state.auth.user)

    const {setPopupContext} = usePopupContext()

    const [registration, {isLoading: isLoadingRegistration}] = useRegistrationMutation();

    const methods = useForm({
        mode: "onChange", resolver: yupResolver(schema)
    });

    const {handleSubmit} = methods;

    const handleSubmitForm = (data: any) => {
        registration(data)
            .unwrap()
            .then(data => {
                dispatch(saveAuth(data))
                handleClose()
            })
    }

    const handleClose = () => {
        setPopupContext({
            innerComponent: undefined
        })
    }

    useEffect(() => {
        console.log(auth)
    })

    return (
        <FormProvider {...methods}>
            {isLoadingRegistration && <Loader/>}
            <div className={s.wrapper}>
                <div className={s.title}>
                    Регистрация
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
                            label={'Фамилия'}
                            name={'last_name'}
                        />
                        <CustomTextField
                            type={"text"}
                            label={'Имя'}
                            name={'first_name'}
                        />
                        <CustomTextField
                            type={"text"}
                            label={'Отчество'}
                            name={'second_name'}
                        />
                        <CustomTextField
                            type={"text"}
                            label={'Email'}
                            name={'email'}
                        />
                        <CustomTextField
                            type={"password"}
                            label={'Пароль'}
                            name={'password'}
                        />
                        <ButtonGroup
                            className={s.buttons}
                            sx={{mt: 1}}
                            size="small"
                            variant="contained"
                        >
                            <Button type={'submit'}>Зарегистрироваться</Button>
                            <Button onClick={handleClose}>Отмена</Button>
                        </ButtonGroup>
                    </Box>
                </div>
            </div>
        </FormProvider>
    );
};

export default Registration;