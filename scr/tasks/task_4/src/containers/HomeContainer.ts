import {SortType} from "../types/SortType.js";
import {ApiConfig} from "../api/ApiConfig.js"
import {ProductItem} from "../models/ProductItem.js";
import {FilterComponent} from "../components/FilterComponent.js";
import {ProductCard} from "../components/ProductCard.js";

export class HomeContainer {
    // todo: add variables for DOM
    rootContainer: HTMLDivElement

    searchInput: HTMLInputElement
    sortButton: HTMLButtonElement
    filterButton: HTMLButtonElement

    sortPopupState: boolean = false
    sortPopupMenu: HTMLDivElement

    sortingTypeInput: HTMLUListElement
    sortTypeState: SortType = SortType.DEFAULT

    private filterComponent: FilterComponent

    constructor() {
        // todo: init variables for DOM
        this.rootContainer = <HTMLDivElement>document.getElementById("product_items_cnt")

        this.searchInput = <HTMLInputElement>document.getElementById("searchbar_input")
        this.sortButton = <HTMLButtonElement>document.getElementById("search_sort_btn")
        this.filterButton = <HTMLButtonElement>document.getElementById("search_settings_btn")
        this.sortPopupMenu = <HTMLDivElement>document.getElementById("sort_popup_menu")
        this.sortingTypeInput = <HTMLUListElement>document.getElementById("sorting_type")

        this.sortButton.addEventListener("click", () => this.showSortPopup())
        // this.settingsButton.addEventListener("click", () => this.showSettingsPopup())

        this.sortingTypeInput.childNodes.forEach((ul) => {
            ul.childNodes.forEach((li) => {
                li.addEventListener("click", () => {
                    this.sortContent(li.firstChild?.nodeValue as SortType)
                })
            })
        })
        this.filterComponent = new FilterComponent(this.rootContainer.id, this.filterButton.id)
        this.init()
    }

    public init(): void {
        // todo: hook for first load page
        // @ts-ignore
        $(".slider").slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1000,
            dots: true,
            arrows: true,
        })

        fetch(ApiConfig.URL)
            .then((response): Promise<ProductItem[]> => {
                if (!response.ok) {
                    throw new Error("Failed to access json data file")
                }
                return response.json()
            })
            .then((data: ProductItem[]) => {
                if (this.rootContainer) {
                    this.render(data)
                } else {
                    throw new Error("cant find root container for content")
                }
            })
            .catch((error) => console.log(`client error: ${error}`))
    }

    public render(productItems: ProductItem[]): void {
        // todo: render page content
        productItems.forEach((productItem) => {
            this.rootContainer.appendChild(ProductCard.createCard(productItem))
        })

        let itemCount: string = <string>String(document.getElementsByClassName("product_card").length)
        let root = document.documentElement;
        root.style.setProperty("--grid-item-rows", String(+itemCount / 2));
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
        } else {
            this.sortPopupMenu.className = "popup-hidden"
            this.sortPopupState = false
        }
    }


}