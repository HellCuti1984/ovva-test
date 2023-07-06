import React, {useEffect} from 'react';
import s from './Filter.module.scss'
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {CustomTextField} from "../../Components/TextField";
import {useAppDispatch, useAppSelector} from "../../Hooks";
import {setFilter} from '../../Store/FilterSlice';
import {Button, Tooltip} from "@mui/material";

const schema = yup.object().shape({
    priceMin: yup
        .number()
        .typeError(""),
    priceMax: yup
        .number()
        .typeError(""),
    capacityMin: yup
        .number()
        .typeError(""),
    capacityMax: yup
        .number()
        .typeError(""),
});

const Filter = () => {

    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.filter.filter)

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            priceMin: filter.priceMin ? filter.priceMin : 0,
            priceMax: filter.priceMax ? filter.priceMax : 0,
            capacityMin: filter.capacityMin ? filter.capacityMin : 0,
            capacityMax: filter.capacityMax ? filter.capacityMax : 0,
        },
        resolver: yupResolver(schema)
    });

    const {handleSubmit, register, reset, watch} = methods

    const handleClearFilter = () => {
        reset({
            priceMin: 0,
            priceMax: 0,
            capacityMin: 0,
            capacityMax: 0,
        })
    }

    useEffect(() => {
        const subscription = watch((value) =>
            dispatch(setFilter(value))
        )

        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <FormProvider {...methods}>
            <div className={s.filter}>
                <div className={s.fields}>
                    <div className={s.field}>
                        <span className={s.title}>Цена</span>
                        <div className={s.price}>
                            <CustomTextField
                                type={"number"}
                                label={'от'}
                                name={'priceMin'}
                                props={{
                                    size: "small",
                                }}
                            />
                            <CustomTextField
                                type={"number"}
                                label={'до'}
                                name={'priceMax'}
                                props={{
                                    size: "small"
                                }}
                            />
                        </div>
                    </div>
                    <div className={s.field}>
                        <span className={s.title}>Вместимость</span>
                        <div className={s.price}>
                            <CustomTextField
                                type={"number"}
                                label={'от'}
                                name={'capacityMin'}
                                props={{
                                    size: "small"
                                }}
                            />
                            <CustomTextField
                                type={"number"}
                                label={'до'}
                                name={'capacityMax'}
                                props={{
                                    size: "small"
                                }}
                            />
                        </div>
                    </div>
                    <div className={s.field}>
                        <Tooltip title="Сбросить фильтер" arrow>
                            <Button variant={'contained'} onClick={handleClearFilter}>Сбросить</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </FormProvider>
    )
}

export default Filter;