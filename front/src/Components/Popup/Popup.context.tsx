import {createContext, ReactElement} from 'react'

export interface IContextPopupContentProps {
    innerComponent?: ReactElement
}

interface IContextPopupProps {
    setPopupContext: ({innerComponent}: IContextPopupContentProps) => void
}

export const PopupContext = createContext<IContextPopupProps>({
    setPopupContext: ({innerComponent}: IContextPopupContentProps) => null
})
