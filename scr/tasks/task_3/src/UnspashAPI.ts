export interface UnsplashUrls {
    raw: string
    full: string
    regular: string
    small: string
}
export interface UnsplashUser {
    username: string
}

export interface UnsplashRandomPhotoResponse {
    alt_description: string
    likes: number
    urls: UnsplashUrls
    user: UnsplashUser
}

export interface HttpResponse<T> extends Response {
    jsonBody?: T[];
}

export interface IApi {
    getImageAPIData<T>(request: Request): Promise<HttpResponse<T>>
}

export class UnspashAPI implements IApi{
    public async getImageAPIData<T>(request: Request): Promise<HttpResponse<T>> {
        return HttpApi.request(request);
    }
}

export class HttpApi {
    static async request<T>(request: Request): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await fetch(request);
        console.log(response);
        
        response.jsonBody = await response.json();
        return response;
    }
}