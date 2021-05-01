export interface ApiResponse<T> extends Response {
    jsonBody?: T;
}