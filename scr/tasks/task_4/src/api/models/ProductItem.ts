import {Color, Memory, Os} from "../types/index.js";
import { Dimention } from "./Dimention.js";

export interface ProductItem {
    name: string
    stock: number
    price: number
    orders: number
    reviews: number
    color: Color
    memory: Memory
    os: Os
    displaySize: number
    dimentions: Dimention
    images: URL[]
}