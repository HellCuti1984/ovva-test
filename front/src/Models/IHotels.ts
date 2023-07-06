
export interface HotelInterface {
    id: number,
    name: number,
    address: number,
    description: number,
    users_id: number,
    geo_lat: number,
    geo_lon: number,
    deleted_at: string,
    created_at: string,
    updated_at: string
}

export interface IHotels {
    hotels: HotelInterface[]
}

export interface HotelResponseInterface {
    code: number,
    data: HotelInterface | null
}

export interface HotelsResponseInterface {
    code: number,
    data: HotelInterface[] | null
}
