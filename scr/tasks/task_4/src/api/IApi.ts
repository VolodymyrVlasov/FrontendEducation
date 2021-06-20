import {ProductItem} from "../models/ProductItem.js";

export interface IApi {
    getProductData(): Promise<ProductItem[]>

    search(params: string): Promise<ProductItem[]>
}