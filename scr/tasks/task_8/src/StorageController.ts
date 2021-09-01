import {LocalStorage, SessionStorage, CookieStorage} from "./storages/index.js"

// import bcrypt from "bcrypt"

export class StorageController {
    private sessionSt: SessionStorage

    constructor() {
        this.sessionSt = new SessionStorage()
    }

    public testSessionStorage() {
        let inputElement = <HTMLInputElement>document?.getElementById('ses_inp')
        inputElement.addEventListener("input", (e) => {
            this.sessionSt.add("inp_state", (<HTMLInputElement>e.target).value)
            console.log()
        })

        let btnRead = <HTMLBaseElement>document?.getElementById('ses_read')
        let label = <HTMLSpanElement>document?.getElementById('ses_out')
        btnRead.addEventListener('click', () => {
            label.innerHTML = this.sessionSt.get('inp_state');
        })

        let btnDelete = <HTMLBaseElement>document?.getElementById('ses_del')
        btnDelete.addEventListener('click', () => {
            this.sessionSt.delete('inp_state');
        })
    }

    public testDefaultCookie() {
        let data = 'test cookie bcrypt'
        // let crypted = bcrypt.hash(data, 12)
        document.cookie = "test_exp=QWERTY; SameSite=Lax; expires=Sat 31 Jul 2021 12:37:00 UTC"
        document.cookie = "locale2=1"
        document.cookie = "locale3=2"
        document.cookie = "locale4=new"
        console.log(document.cookie)
    }

    public testHTTPOnlyCookie() {

    }
}

new StorageController().testDefaultCookie()