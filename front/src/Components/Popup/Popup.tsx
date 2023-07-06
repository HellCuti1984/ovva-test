import React, {ReactElement, useState} from 'react'
import s from './Popup.module.scss'

import {IContextPopupContentProps, PopupContext} from './Popup.context'

interface IPopup {
    children: ReactElement[];
}

export const Popup = ({children}: IPopup) => {

    const [popupProps, setPopupProps] = useState<IContextPopupContentProps>()

    const setPopupContext = ({innerComponent}: IContextPopupContentProps): null => {
        setPopupProps({
            innerComponent: innerComponent,
        })
        return null
    }

    const handleClosePopup = () => {
        setPopupProps({
            innerComponent: undefined,
        })
    }

    const InnerComponent = (): ReactElement => popupProps?.innerComponent as React.ReactElement<any, string | React.JSXElementConstructor<any>>

    return (
        <PopupContext.Provider value={{setPopupContext}}>
            {popupProps?.innerComponent && <div className={s.wrapper}>
                <div className={s.background} onClick={handleClosePopup}/>
                <div className={s.popup}>
                    {InnerComponent && <InnerComponent/>}
                </div>
            </div>}
            {children}
        </PopupContext.Provider>
    )
}
