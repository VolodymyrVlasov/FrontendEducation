import {ProductItem} from "../models/ProductItem.js";
import {ApiConfig} from "./ApiConfig.js";

export class FakeBackend {

    public static async search(params: string): Promise<ProductItem[]> {
        let rawResponse = await fetch(ApiConfig.URL)
        if (!rawResponse.ok) {
            throw new Error('failed to proceed api request')
        }
        let jsonResponse: Promise<ProductItem[]> = await rawResponse.json()
        return (await jsonResponse).filter((item) => item.name.toLocaleLowerCase().includes(params.toLocaleLowerCase()))

    }
}