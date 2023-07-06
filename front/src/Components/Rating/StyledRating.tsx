import React, {useEffect, useState} from 'react';
import {Rating} from "@mui/material";
import {RatingProps} from "@mui/material/Rating/Rating";

interface IRating {

}

const StyledRating = (props: RatingProps) => {

    const [value, setValue] = useState<number | null>(0)

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <Rating
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            {...props}
        />
    )
}

export default StyledRating;