import {ProductItem} from "../models/ProductItem.js";
import {ApiConfig} from "./ApiConfig.js";

export class FakeBackend {

    public static async search(params: string): Promise<ProductItem[]> {
        let rawResponse = await fetch(ApiConfig.URL)
        if (!rawResponse.ok) {
            throw new Error('failed to proceed api request')
        }
        let jsonResponse: Promise<ProductItem[]> = await rawResponse.json()
        return (await jsonResponse).filter((item) => {
            let isName =  item.name.toLocaleLowerCase().includes(params.toLocaleLowerCase())
            let isPrice = item.price == Number(params)
            let isColor =  item.color.some((color: string) => {
                 return color.toLocaleLowerCase().includes(params.toLocaleLowerCase())
            } )
            return isName || isPrice || isColor
        })

    }
}