export type TNotifyType = "error" | "warning" | "info" | "success"

export interface INotify {
    id: number,
    type:  TNotifyType,
    message: string,
    open?: boolean,
    handleClose?: () => void,
    vertical?: "top" | "bottom",
    horizontal?: "center" | "left" | "right",
    time?: number,
}
