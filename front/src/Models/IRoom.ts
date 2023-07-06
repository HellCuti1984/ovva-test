export interface IRoom {
    id?: number,
    hotels_id: number,
    number: number,
    capacity: number,
    price: number,
    description: string,
    deleted_at?: string,
    created_at?: string,
    updated_at?: string
}

export interface IRoomForm {
    hotels_id: number | undefined;
    number: number;
    price: number;
    capacity: number;
    description: string;
}