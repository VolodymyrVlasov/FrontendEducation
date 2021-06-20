export interface ISearchBarComponent {
    search(): void
}


export class SearchBarComponent implements ISearchBarComponent {
    input: HTMLInputElement
    isUserInputSessionInactive: boolean

    constructor(inputId?: string, input?: HTMLInputElement) {
        if (inputId && input == undefined) {
            this.input = <HTMLInputElement>document.getElementById(inputId)
        } else if (input) {
            this.input = input
        } else {
            throw new Error("Search bar input component is not found! (ts: 10)")
        }

        this.isUserInputSessionInactive = true

        this.input.addEventListener('focusin', (e) => {
            this.isUserInputSessionInactive = false
            console.log("enter was started")
        })

        this.input.addEventListener('keyup', (e: any) => {
            if (e.keyCode === 13 && !this.isUserInputSessionInactive) {
                this.search()
                console.log("enter was pressed")
            }
        })

        this.input.addEventListener('focusout', (e) => {
            !this.isUserInputSessionInactive && this.search()
            console.log("focus on input was lost")

        })
    }

    public search(): void {
        console.log('search for searchbar input')
        this.isUserInputSessionInactive = true
    }
}