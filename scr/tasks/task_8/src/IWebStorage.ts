export interface IWebStorage {
    add(key: string, data: string): void

    get(key: string): any

    delete(key: string): boolean
}