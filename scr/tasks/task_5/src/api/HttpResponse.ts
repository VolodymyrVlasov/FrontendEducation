export interface HttpResponse<T> extends Response {
    jsonBody?: T;
}
