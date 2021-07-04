import {ProductItem} from "../models/ProductItem";

export class ShoppingCart {
    private isCardVisible: boolean = false
    private itemsCnt: string = 'cart_card_items_cnt';
    private cartCnt: HTMLElement
    private cartBtn: HTMLButtonElement
    private cartItems: Array<ProductItem>

    constructor(cntId: string) {
        this.cartCnt = <HTMLElement>document?.getElementById(cntId)
        this.cartBtn = <HTMLButtonElement>document?.getElementById("cart_button")
        this.cartBtn.addEventListener('click', () => this.mountCart())
        this.cartItems = this.getStorageItems() ? this.getStorageItems() : new Array<ProductItem>()
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
                       ${this.cartItems.length != 0 ? 
                            this.cartItems.map(productItem => this.renderItems(productItem)).join("") : "Cart empty"}
                    </div>
                    <div class="cart_card_info">
                        <p class="cart_card_info_str">Total amount: <span class="cart_card_info_value">3 ptc.</span></p>
                        <p class="cart_card_info_str">Total price: <span class="cart_card_info_value">1699$</span></p>
                    </div>
                    <div class="cart_card_btn_wrapper">
                        <button>Buy</button>
                    </div>
            `
            this.cartCnt.appendChild(contentCard)
            this.isCardVisible = !this.isCardVisible
        } else {
            this.isCardVisible && this.cartCnt.removeChild(<HTMLElement>document?.getElementById('cart_card'))
            this.isCardVisible = !this.isCardVisible
        }
    }

    private renderItems(productItem: ProductItem): string {
        let str = ` <div class="item_card_cart">
                            <div class="item_cnt">
                                <img class="item_cnt_img" src="" alt="">
                            </div>
                            <div class="item_cnt">
                                <p class="item_cnt_title">Apple AirPods Pro</p>
                                <div class="item_cnt_price">$600</div>
                            </div>
                            <div class="item_cnt_row">
                                <button class="item_cnt_btn"><</button>
                                <p class="item_cnt_amount">2</p>
                                <button class="item_cnt_btn">></button>
                                <button class="item_cnt_btn_del">X</button>
                            </div>
                        </div>`

        return str
    }

    public addItem(product: ProductItem) {
        this.cartItems.push(product)
        console.log(this.cartItems.length)
    }

    private removeItem() {

    }

    private changeAmount() {

    }

    private getItemsAmount() {

    }

    private getStorageItems(): Array<ProductItem> {
        return this.cartItems
    }

    private setStorageItem() {

    }


}