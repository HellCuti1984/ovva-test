import React from 'react';
import s from './Login.module.scss'

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Button, ButtonGroup} from "@mui/material";
import {CustomTextField} from '../../../../Components/TextField';
import {usePopupContext} from "../../../../Components/Popup/usePopupContext";
import {useAppDispatch} from "../../../../Hooks";
import {saveAuth} from "../../../../Store/AuthSlice";
import {useLoginMutation} from "../../../../Services/AuthService";
import {ILogin} from "../../../../Models/ILogin";
import {Loader} from "../../../../Components/Loader";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    password: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
});

const Login = () => {

    const dispatch = useAppDispatch();

    const {setPopupContext} = usePopupContext()

    const [login, {isLoading: isLoadingLogin}] = useLoginMutation();

    const methods = useForm({
        mode: "onChange", resolver: yupResolver(schema)
    });

    const {handleSubmit} = methods;

    const handleSubmitForm = (data: ILogin) => {
        login(data)
            .unwrap()
            .then(data => {
                dispatch(saveAuth(data))
                handleClose();
            })
    }

    const handleClose = () => {
        setPopupContext({
            innerComponent: undefined
        })
    }

    return (
        <FormProvider {...methods}>
            {isLoadingLogin && <Loader/>}
            <div className={s.wrapper}>
                <div className={s.title}>
                    Вход
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
                            <Button type={'submit'}>Войти</Button>
                            <Button onClick={handleClose}>Отмена</Button>
                        </ButtonGroup>
                    </Box>
                </div>
            </div>
        </FormProvider>
    );
};

export default Login;