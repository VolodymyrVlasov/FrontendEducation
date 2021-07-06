import {ProductItem} from "../models/ProductItem.js";
import {CartProductItem} from "../models/CartProductItem.js";

export class ShoppingCart {
    private isCardVisible: boolean = false
    private cartCnt: HTMLElement
    private cartBtn: HTMLButtonElement
    private cartBtnIndex: HTMLDivElement
    private cartItems: Array<CartProductItem>

    constructor(cntId: string) {
        this.cartCnt = <HTMLElement>document?.getElementById(cntId)
        this.cartBtn = <HTMLButtonElement>document?.getElementById("cart_button")
        this.cartBtnIndex = <HTMLDivElement>document?.getElementById("cart_index")
        this.cartBtn.addEventListener('click', () => this.mountCart())
        this.cartItems = this.getStorageItems() ? this.getStorageItems() : new Array<CartProductItem>()
    }

    public mountCart() {
        let contentCard: HTMLDivElement = document.createElement('div')
        if (!this.isCardVisible) {
            contentCard.className = 'cart_card'
            contentCard.id = "cart_card"
            contentCard.innerHTML = ` 
                    <div class="cart_card_header">
                        <p>Shopping Cart</p>
                        <span>Checkout is almost done!</span>
                    </div>
                    <div class="cart_card_items_cnt" id="cart_card_items_cnt">
                       ${this.getStorageItems().length != 0 ?
                this.getStorageItems().map(productItem => this.renderItems(productItem)).join("")
                :
                "<div class='cart_empty'>Cart empty</div>"}
                    </div>
                    <div class="cart_card_info">
                        <p class="cart_card_info_str">Total amount: <span class="cart_card_info_value">${this.getItemsAmount()} ptc.</span></p>
                        <p class="cart_card_info_str">Total price: <span class="cart_card_info_value">${this.getTotalPrice()}$</span></p>
                    </div>
                    <div class="cart_card_btn_wrapper">
                        <button>Buy</button>
                    </div>
            `
            this.cartCnt.appendChild(contentCard)
            this.addListeners(contentCard)
            this.isCardVisible = !this.isCardVisible
        } else {
            this.isCardVisible && this.cartCnt.removeChild(<HTMLElement>document?.getElementById('cart_card'))
            this.isCardVisible = !this.isCardVisible
        }
    }

    private renderItems(cartProductItem: CartProductItem): string {
        return `<div class="item_card_cart">
                    <div class="item_cnt">
                        <img class="item_cnt_img" src="assets/${cartProductItem.productItem.imgUrl}" alt="${cartProductItem.productItem.name}">
                    </div>
                    <div class="item_cnt">
                        <p class="item_cnt_title">${cartProductItem.productItem.name}</p>
                        <div class="item_cnt_price">$${cartProductItem.productItem.price}</div>
                    </div>
                    <div class="item_cnt_row">
                        <button class="item_cnt_btn" value="cart_minus" id="${cartProductItem.productItem.id}"><</button>
                        <p class="item_cnt_amount">${cartProductItem.amount}</p>
                        <button class="item_cnt_btn" value="cart_plus" id="${cartProductItem.productItem.id}">></button>
                        <button class="item_cnt_btn_del" value="cart_delete" id="${cartProductItem.productItem.id}">X</button>
                    </div>
                </div>`
    }

    private addListeners(contentCard: HTMLElement) {
        let buttons: HTMLCollection = contentCard.getElementsByTagName("button")
        Array.from(buttons).forEach((button) => {
            button.addEventListener('click', (e) => {
                let attr = <HTMLButtonElement>e.target
                if (attr.innerText == "X") {
                    this.removeItem(Number(attr.id))
                } else if (attr.innerText == "<") {
                    this.changeAmount(Number(attr.id), "<")
                } else if (attr.innerText == ">") {
                    this.changeAmount(Number(attr.id), ">")
                } else {
                    throw new Error("No matches for button <, > or X")
                }
            })
        })
    }

    public addItem(product: ProductItem) {
        let isProductAdded = false
        if (this.getStorageItems().length == 0) {
            this.cartItems.push({amount: 1, productItem: product})
        } else {
            this.getStorageItems().forEach((item) => {
                if (item.productItem.id == product.id) {
                    item.amount += 1
                    isProductAdded = true
                }
            })
            if (!isProductAdded) {
                this.cartItems.push({amount: 1, productItem: product})
            }
        }
        this.refreshCard()
        this.cartBtnIndex.innerHTML = String(this.getItemsAmount())
    }

    private changeAmount(id: number, operation: string) {
        if (operation === "<") {
            this.getStorageItems().forEach((item) => {
                if (item.productItem.id == id) {
                    item.amount--
                    if (item.amount <= 0) {
                        this.removeItem(id)
                    }
                }
            })
        } else if (operation === ">") {
            this.getStorageItems().forEach((item) => {
                if (item.productItem.id == id) {
                    item.amount++
                }
            })
        }
        this.refreshCard()
    }

    public removeItem(id: number) {
        this.getStorageItems().forEach((item, index) => {
            if (item.productItem.id == id) {
                this.cartItems.splice(index, 1)
                this.cartBtnIndex.innerHTML = String(this.getItemsAmount())
                this.refreshCard()
            }
        })
    }

    private refreshCard(): void {
        this.setStorageItem()
        if (this.isCardVisible) {
            this.isCardVisible && this.cartCnt.removeChild(<HTMLElement>document?.getElementById('cart_card'))
            this.isCardVisible = !this.isCardVisible
            this.mountCart()
        }
    }

    private getItemsAmount(): number {
        let amount: number = 0
        this.getStorageItems().forEach((item) => amount += Number(item.amount))
        return amount
    }

    private getTotalPrice(): number {
        let totalPrice: number = 0
        this.getStorageItems().forEach((item) => totalPrice += Number(item.productItem.price * item.amount))
        return totalPrice
    }

    private getStorageItems(): Array<CartProductItem> {
        return this.cartItems
    }

    private setStorageItem(): void {
        console.log("writing to storage")
    }
}