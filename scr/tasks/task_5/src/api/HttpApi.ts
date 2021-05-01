import {HttpResponse} from "./HttpResponse.js";

export class HttpApi {
    static async request<T>(request: Request): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await fetch(request);
        response.jsonBody = await response.json();
        return response;
    }
}