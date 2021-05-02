import {IApi} from "./IApi.js";
import {HttpResponse} from "./HttpResponse.js";
import {HttpApi} from "./HttpApi.js";


export class Api implements IApi{
    public async getVideoAPIData<T>(request: Request): Promise<HttpResponse<T>> {
        return HttpApi.request(request);
    }
}
