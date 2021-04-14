export interface UnsplashUrls {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
}
export interface UnsplashUser {
    username: string
    name: string
    location: string
}

export interface UnsplashRandomPhotoResponse {
    downloads: number
    likes: number
    description: string
    urls: UnsplashUrls
    user: UnsplashUser
}

export interface HttpResponse<T> extends Response {
    jsonBody?: T;
}

export interface IApi {
    getImageAPIData<T>(request: Request): Promise<HttpResponse<T>>
}

export class Api implements IApi{
    public async getImageAPIData<T>(request: Request): Promise<HttpResponse<T>> {
        return HttpApi.request(request);
    }
}

export class HttpApi {
    static async request<T>(request: Request): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await fetch(request);
        response.jsonBody = await response.json();
        return response;
    }
}