import React, {useEffect} from 'react';
import {Alert, Slide, SlideProps, Snackbar} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useAppDispatch} from "../../Hooks";
import {deleteNotify} from "../../Store/NotifiesSlice";
import {INotify} from "../../Models/INotify";

type TransitionProps = Omit<SlideProps, 'direction'>;
const Notify = ({id, horizontal, vertical, type, open, time, message, handleClose}: INotify) => {
    const StyleSnackBar = styled(Snackbar)(({theme}) => ({
        '&.MuiSnackbar-root': {
            display: 'block',
            position: 'unset',
            margin: '12px'
        },
    }))

    const dispatch = useAppDispatch();

    function TransitionRight(props: TransitionProps) {
        return <Slide {...props} direction="left"/>;
    }

    const handleOnClose = () => {
        dispatch(deleteNotify(id))
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteNotify(id))
        }, time)
    })

    return (
        <StyleSnackBar
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionRight}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Alert variant="outlined"
                   severity={type}
                   onClose={handleOnClose}
                   sx={{width: '100%', background: '#fff'}}>
                {message}
            </Alert>
        </StyleSnackBar>
    );
};

export default Notify;
