import {SortType} from "../types/SortType.js";
import {ProductItem} from "../models/ProductItem.js";
import {FilterComponent} from "../components/FilterComponent.js";
import {ProductCard} from "../components/ProductCard.js";
import {SearchBarComponent} from "../components/SearchBarComponent.js";
import {api} from "../api/Api.js";
import {OopsCard} from "../components/OppsCard.js";
import {FullProductCard} from "../components/FullProductCard.js";
import {ShoppingCart} from "../components/ShoppingCart.js";

export class HomeContainer {
    private inputSearch: HTMLInputElement
    private searchBarComponent: SearchBarComponent
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
    private cart: ShoppingCart

    constructor() {
        this.init()
        this.rootContainer = <HTMLDivElement>document.getElementById("product_items_cnt")
        this.searchInput = <HTMLInputElement>document.getElementById("searchbar_input")
        this.sortButton = <HTMLButtonElement>document.getElementById("search_sort_btn")
        this.filterButton = <HTMLButtonElement>document.getElementById("search_settings_btn")
        this.sortPopupMenu = <HTMLDivElement>document.getElementById("sort_popup_menu")
        this.sortingTypeInput = <HTMLUListElement>document.getElementById("sorting_type")
        this.sortButton.addEventListener("click", () => this.showSortPopup())

        this.inputSearch = <HTMLInputElement>document.getElementById('searchbar_input');
        this.searchBarComponent = new SearchBarComponent(this, 'searchbar_input')

        this.sortingTypeInput.childNodes.forEach((ul) => {
            ul.childNodes.forEach((li) => {
                li.addEventListener("click", () => {
                    this.sortType = li.firstChild?.nodeValue as SortType
                    this.sortPopupMenu.className = "popup-hidden"
                    this.sortPopupState = false
                })
            })
        })

        this.cart = new ShoppingCart("shopping_cart")
    }

    public get productData(): ProductItem[] {
        if (this.workingProductData) {
            return this.workingProductData
        } else {
            throw new Error('productData undefined')
        }
    }

    public render(productItems?: ProductItem[]): void {
        console.log(productItems?.length)
        if (productItems && productItems.length == 0) {
            OopsCard.scheduleRender()
            this.filterComponent?.clearFilterParams()
            this.workingProductData = this.productData
        } else if (productItems && productItems.length != 0) {
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
            let card = ProductCard.createCard(productItem)
            this.rootContainer.appendChild(card)
            card.addEventListener('click', () => new FullProductCard().render(productItem, this.cart))
        })

        let itemCount: number = <number>document.getElementsByClassName("product_card").length
        let root = document.documentElement;
        root.style.setProperty("--grid-item-rows", String(Math.ceil(itemCount / 2) + 1));
    }

    private addListener(products: ProductItem[]) {
        products.forEach((product: ProductItem) => {
            let productBtn: HTMLButtonElement = <HTMLButtonElement>document?.getElementById(`btn_${product.id}`)
            productBtn?.addEventListener('click', (e) => console.log(e.target))
        })
    }

    private init(): void {
        $(".slider").slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1000,
            dots: true,
            arrows: true,
        })

        api.getProductData()
            .then((data) => {
                this._productData = data
                return data
            })
            .then(data => {
                if (this.rootContainer) {
                    setTimeout(() => this.render(data), 10)
                    this.addListener(data)
                    this.filterComponent = new FilterComponent(this.rootContainer.id, this.filterButton.id, this)
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