import React from 'react';
import * as yup from "yup";
import {Box, Button, ButtonGroup} from "@mui/material";
import {CustomTextField} from "../../../Components/TextField";
import {FormProvider, useForm} from "react-hook-form";
import {createNotifies} from "../../../Store/NotifiesSlice";
import errorsToString from "../../../Helpers/errors";
import {useAppDispatch} from "../../../Hooks";
import {usePopupContext} from "../../../Components/Popup/usePopupContext";
import {yupResolver} from "@hookform/resolvers/yup";
import {useStoreHotelMutation} from "../../../Services/HotelsService";
import {Loader} from "../../../Components/Loader";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    address: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
    description: yup
        .string()
        .required("Поле обязательно к заполнению!")
        .typeError("Поле обязательно к заполнению!"),
});

const CreateHotel = () => {

    const dispatch = useAppDispatch()

    const {setPopupContext} = usePopupContext()
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            name: '',
            address: '',
            description: '',
        },
        resolver: yupResolver(schema)
    });

    const {handleSubmit} = methods;

    const [createRoom, {isLoading: isLoadingCreatingRoom}] = useStoreHotelMutation();

    const handleCloseHotelForm = () => {
        setPopupContext({
            innerComponent: undefined
        })
    }

    const handleSubmitForm = (data: any) => {
        createRoom(data)
            .unwrap()
            .then(data => {
                dispatch(createNotifies({
                    type: 'success',
                    message: 'Отель успешно создан',
                    time: 3000
                }))
                handleCloseHotelForm();
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
            <div>
                {isLoadingCreatingRoom && <Loader/>}
                <div>
                    Создать отель
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
                            label={'Название'}
                            name={'name'}
                        />
                        <CustomTextField
                            type={"text"}
                            label={'Адресс'}
                            name={'address'}
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
                            <Button type={'submit'}>Создать отель</Button>
                            <Button onClick={handleCloseHotelForm}>Отмена</Button>
                        </ButtonGroup>
                    </Box>
                </div>
            </div>
        </FormProvider>
    );
};

export default CreateHotel;