import {api} from "../api/Api.js";
import {HomeContainer} from "../containers/HomeContainer.js";

export interface ISearchBarComponent {
    search(params: string): void
}


export class SearchBarComponent implements ISearchBarComponent {
    private input: HTMLInputElement
    private isUserInputSessionInactive: boolean
    private homeContainer: HomeContainer

    constructor(homeContainer: HomeContainer, inputId: string) {
        this.homeContainer = homeContainer
        if (!inputId) {
            throw new Error("Search bar input component is not found! (ts: 17)")
        } else {
            this.input = <HTMLInputElement>document.getElementById(inputId)
        }
        this.isUserInputSessionInactive = true
        this.input.addEventListener('focusin', e => this.isUserInputSessionInactive = false)
        this.input.addEventListener('focusout', (e: any) => !this.isUserInputSessionInactive && this.search(e.target.value))
        this.input.addEventListener('keyup', (e: any) => {
            if (e.keyCode === 13) {
                this.search(e.target.value)
            }
        })
    }

    public search(params: string): void {
        this.isUserInputSessionInactive = true

        api.search(params)
            .then(data => {
                this.homeContainer.render(data)
            })
            .catch(error => {
                throw new Error(`search failed with error ${error}`)
            })
    }
}