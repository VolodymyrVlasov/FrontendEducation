import {HttpResponse} from "./HttpResponse.js";

export interface IApi {
    getVideoAPIData<T>(request: Request): Promise<HttpResponse<T>>
}