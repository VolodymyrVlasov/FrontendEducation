import {IWebStorage} from "../IWebStorage.js";

export class CookieStorage implements IWebStorage{
    add(key: string, data: string): void {
    }

    delete(key: string): boolean {
        return false;
    }

    get(key: string): any {
    }

}