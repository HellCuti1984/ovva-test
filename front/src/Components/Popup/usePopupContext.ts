import {useContext} from "react";
import {PopupContext} from "./Popup.context";

export const usePopupContext = () => useContext(PopupContext)