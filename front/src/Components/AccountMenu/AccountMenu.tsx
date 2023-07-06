import React from "react";
import {ListItemIcon, Menu, MenuItem} from "@mui/material";
import {Logout} from "@mui/icons-material";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{horizontal: "right", vertical: "top"}}
            anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        >
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Выход
            </MenuItem>
        </Menu>
    );
}