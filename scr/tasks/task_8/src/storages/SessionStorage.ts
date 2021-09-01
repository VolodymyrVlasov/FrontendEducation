import {IWebStorage} from "../IWebStorage.js";

export class SessionStorage implements IWebStorage {
    add(key: string, data: string): void {
        sessionStorage.setItem(key, data)
    }

    delete(key: string): boolean {
        if (sessionStorage.getItem(key) !== undefined) {
            sessionStorage.removeItem(key)
            return true
        } else {
            return false
        }
    }

    get(key: string): any {
        return sessionStorage.getItem(key)
    }
}