import TextField from "@mui/material/TextField";
import {useFormContext} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import * as React from "react";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {Label} from "@mui/icons-material";

interface ICustomTextField {
    name: string,
    label: string,
    type?: React.InputHTMLAttributes<unknown>['type'] | "text",
    placeholder?: string,
    props?: TextFieldProps
}

const CustomTextField = ({
                             name,
                             type,
                             label,
                             placeholder = "",
                             props
                         }: ICustomTextField) => {

    //@ts-ignore
    const {register, errors} = useFormContext();

    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                placeholder={placeholder}
                label={label}
                type={type}
                {...props}
                {...register(name)}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({message}) => (
                    <span style={{color: "red"}}>{message}</span>
                )}
            />
        </>
    );
}

export default CustomTextField;
