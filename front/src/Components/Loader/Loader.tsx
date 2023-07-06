import {Box, CircularProgress} from '@mui/material'
import s from './Loader.module.scss'
import React from 'react'

export default function Loader() {
    return (
        <Box className={s.loader}>
            <CircularProgress color={`primary`}/>
        </Box>
    )
}
