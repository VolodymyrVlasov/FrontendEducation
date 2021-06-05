import {Color, Os} from "../types/index.js";
import {Dimention} from "./Dimention.js";

export interface ProductItem {
    name: string
    orderInfo: OrderInfo
    os: Os
    size: Dimention
    storage: number
    ram: number
    price: number
    color: Color[]
    display: number
    imgUrl: string
    orders: number
}

export interface OrderInfo {
    inStock: number
    reviews: number
}