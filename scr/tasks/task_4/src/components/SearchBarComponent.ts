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
            throw new Error("Search bar input component is not found! (ts: 10)")
        } else {
            this.input = <HTMLInputElement>document.getElementById(inputId)
        }
        this.isUserInputSessionInactive = true
        this.input.addEventListener('focusin', e => {
            this.isUserInputSessionInactive = false
            console.log('search focusin')
        })
        this.input.addEventListener('focusout', (e: any) => {
            !this.isUserInputSessionInactive && this.search(e.target.value)
            console.log('search focusout')
        })
        this.input.addEventListener('keyup', (e: any) => {
            if (e.keyCode === 13) {
                this.search(e.target.value)
                console.log('search keyup')

            }
        })
    }

    public search(params: string): void {
        console.log('search for searchbar input')
        this.isUserInputSessionInactive = true

        api.search(params)
            .then(data => {
                console.log(data)
                this.homeContainer.render(data)
            })
            .catch(error => {
                throw new Error(`search failed with error ${error}`)
            })
    }
}