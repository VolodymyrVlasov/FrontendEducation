import {SortType} from "../types/SortType.js";

export class HomeContainer {
    // todo: add variables for DOM
    rootContainer: HTMLDivElement

    searchInput: HTMLInputElement
    sortButton: HTMLButtonElement
    settingsButton: HTMLButtonElement

    sortPopupState: boolean = false
    sortPopupMenu: HTMLDivElement

    settingsPopupState: boolean = false
    // settingsPopupMenu: HTMLDivElement

    sortingTypeInput: HTMLUListElement
    sortTypeState: SortType = SortType.DEFAULT

    constructor() {
        // todo: init variables for DOM
        this.rootContainer = <HTMLDivElement>document.getElementById("root_cnt")
        this.searchInput = <HTMLInputElement>document.getElementById("searchbar_input")
        this.sortButton = <HTMLButtonElement>document.getElementById("search_sort_btn")
        this.settingsButton = <HTMLButtonElement>document.getElementById("search_settings_btn")
        this.sortPopupMenu = <HTMLDivElement>document.getElementById("sort_popup_menu")
        this.sortingTypeInput = <HTMLUListElement>document.getElementById("sorting_type")

        this.sortButton.addEventListener("click", () => this.showSortPopup())
        this.settingsButton.addEventListener("click", () => this.showSettingsPopup())

        this.sortingTypeInput.childNodes.forEach((ul) => {
            ul.childNodes.forEach((li) => {
                li.addEventListener("click", () => {
                    this.sortContent(li.firstChild?.nodeValue as SortType)
                })
            })
        })
    }

    public init(): void {
        // todo: hook for first load page
    }

    public render(): void {
        // todo: render page content
    }

    private sortContent(sortingType: SortType): void {
        // todo: add logic to sort item cards and call render method
        this.sortTypeState = sortingType

    }

    private showSortPopup() {
        // todo: show sort popup menu
        if (!this.sortPopupState) {
            this.sortPopupMenu.className = "popup"
            this.sortPopupState = true
            // this.settingsPopupMenu.className = "popup-hidden"
            this.settingsPopupState = false
        } else {
            this.sortPopupMenu.className = "popup-hidden"
            this.sortPopupState = false
        }
    }

    private showSettingsPopup() {
        // todo: show settings popup menu
        if (!this.settingsPopupState) {
            // this.settingsPopupMenu.className = "popup"
            this.settingsPopupState = true
            this.sortPopupMenu.className = "popup-hidden"
            this.sortPopupState = false
        } else {
            // this.settingsPopupMenu.className = "popup-hidden"
            // this.settingsPopupMenu = false
        }
    }
}