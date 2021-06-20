import {IApi} from "./IApi.js";
import {ProductItem} from "../models/ProductItem.js";
import {ApiConfig} from "./ApiConfig.js";
import {FakeBackend} from "./FakeBackend.js";

export class Api implements IApi {
    private url: string

    constructor() {
        this.url = ApiConfig.URL
    }

    public async getProductData(): Promise<ProductItem[]> {
        let rawResponse = await fetch(this.url)
        if (!rawResponse.ok) {
            throw new Error('failed to proceed api request')
        }
        let jsonResponse = await rawResponse.json()
        return jsonResponse
    }

    public async search(params: string): Promise<ProductItem[]> {
        return await FakeBackend.search(params)
    }
}

export const api = new Api()
