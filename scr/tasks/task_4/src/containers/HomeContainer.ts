import {SortType} from "../types/SortType.js";
import {ApiConfig} from "../api/ApiConfig.js"
import {ProductItem} from "../models/ProductItem.js";
import {FilterComponent} from "../components/FilterComponent.js";
import {ProductCard} from "../components/ProductCard.js";

export class HomeContainer {
    private rootContainer: HTMLDivElement
    private searchInput: HTMLInputElement
    private sortButton: HTMLButtonElement
    private filterButton: HTMLButtonElement
    private sortPopupState: boolean = false
    private sortPopupMenu: HTMLDivElement
    private sortingTypeInput: HTMLUListElement
    private sortTypeState: SortType = SortType.DEFAULT
    private filterComponent?: FilterComponent
    private _productData?: ProductItem[]

    constructor() {
        this.init()
        this.rootContainer = <HTMLDivElement>document.getElementById("product_items_cnt")
        this.searchInput = <HTMLInputElement>document.getElementById("searchbar_input")
        this.sortButton = <HTMLButtonElement>document.getElementById("search_sort_btn")
        this.filterButton = <HTMLButtonElement>document.getElementById("search_settings_btn")
        this.sortPopupMenu = <HTMLDivElement>document.getElementById("sort_popup_menu")
        this.sortingTypeInput = <HTMLUListElement>document.getElementById("sorting_type")
        this.sortButton.addEventListener("click", () => this.showSortPopup())

        this.sortingTypeInput.childNodes.forEach((ul) => {
            ul.childNodes.forEach((li) => {
                li.addEventListener("click", () => {
                    this.sortContent(li.firstChild?.nodeValue as SortType)
                })
            })
        })
    }

    public get productData(): ProductItem[] {
        if (this._productData) {
            return this._productData
        } else {
            throw new Error('productData undefined')
        }
    }

    public render(productItems: ProductItem[]): void {
        if (this.rootContainer.children.length > 1) {
            let filterCard = <HTMLElement>this.rootContainer.firstChild
            if (filterCard.className == 'product_cnt_filter_cnt') {
                this.rootContainer.innerHTML = ''
                this.rootContainer.appendChild(filterCard)
            }
        }

        productItems.forEach((productItem) => {
            this.rootContainer.appendChild(ProductCard.createCard(productItem))
        })

        let itemCount: string = <string>String(document.getElementsByClassName("product_card").length)
        let root = document.documentElement;
        root.style.setProperty("--grid-item-rows", String(+itemCount / 2));
    }

    private init(): void {
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
            .then((data) => {
                this._productData = data
                return data
            })
            .then((data: ProductItem[]) => {
                if (this.rootContainer) {
                    this.render(data)
                    this.filterComponent = new FilterComponent(this.rootContainer.id, this.filterButton.id, this)
                    return data
                } else {
                    throw new Error("cant find root container for content")
                }
            })
            .catch((error) => console.log(`client error: ${error}`))
    }

    private sortContent(sortingType: SortType): void {
        // todo: add logic to sort item cards and call render method
        this.sortTypeState = sortingType
    }

    private showSortPopup() {
        if (!this.sortPopupState) {
            this.sortPopupMenu.className = "popup"
            this.sortPopupState = true
        } else {
            this.sortPopupMenu.className = "popup-hidden"
            this.sortPopupState = false
        }
    }
}