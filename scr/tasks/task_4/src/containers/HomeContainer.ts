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
    private _sortType: SortType = SortType.DEFAULT
    private filterComponent?: FilterComponent
    private _productData?: ProductItem[]
    private workingProductData?: ProductItem[]

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
                    this.sortType = li.firstChild?.nodeValue as SortType
                    this.sortPopupMenu.className = "popup-hidden"
                    this.sortPopupState = false
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

    public render(productItems?: ProductItem[]): void {
        if (productItems) {
            this.workingProductData = productItems
        } else if (!productItems && !this.workingProductData) {
            this.workingProductData = this.productData
        } else {
            this.workingProductData = this.productData
        }
        this.sortContent()
        if (this.rootContainer.children.length > 1) {
            let cards = <HTMLCollection>document.getElementsByClassName('product_card')
            while (cards[0]) {
                this.rootContainer.removeChild(cards[0])
            }
            if (this.rootContainer.children.length > 0) {
                let filterCard = <HTMLDivElement>this.rootContainer.firstChild
                if (filterCard.className == 'product_cnt_filter_cnt') {
                    this.rootContainer.innerHTML = ''
                    this.rootContainer.appendChild(filterCard)
                }
            }
        }

        this.workingProductData.forEach((productItem) => {
            this.rootContainer.appendChild(ProductCard.createCard(productItem))
        })

        let itemCount: number = <number>document.getElementsByClassName("product_card").length
        let root = document.documentElement;
        root.style.setProperty("--grid-item-rows", String(Math.ceil(itemCount / 2) + 1));

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

    private set sortType(sortingType: SortType) {
        this._sortType = sortingType
        this.render()
    }

    private sortContent(): ProductItem[] {
        if (this.workingProductData) {
            switch (this._sortType) {
                case SortType.ASCENDING:
                    return this.workingProductData.sort((a, b) => a.price - b.price)
                case SortType.DESCENDING:
                    return this.workingProductData.sort((a, b) => b.price - a.price)
                default:
                    return this.workingProductData.sort((a, b) => a.id - b.id)
            }
        } else {
            throw new Error('productData undefined')
        }
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