import {ProductItem} from "../models/ProductItem.js";
import {ShoppingCart} from "./ShoppingCart.js";

export class FullProductCard {
    private card?: HTMLElement
    private addToCartBtn?: HTMLButtonElement

    public render(product: ProductItem, shoppingCart: ShoppingCart): void {
        let body = <HTMLElement>document?.getElementsByTagName('body')[0]
        body.appendChild(this.getFullProductCard(product))
        this.card = <HTMLElement>document?.getElementById('popup_backdrop')
        this.card.addEventListener('click', (e) => this.closeFullCard(e))
        this.addToCartBtn = <HTMLButtonElement>document.getElementById(`btn_${product.id}`)
        this.addToCartBtn.addEventListener('click', () => shoppingCart.addItem(product))
    }

    private getFullProductCard(product: ProductItem): HTMLDivElement {
        let card: HTMLDivElement = document.createElement('div')
        let btnId = `btn_${product.id}`
        card.innerHTML =
            `
        <div class="popup_wrapper" id="popup_wrapper">
             <div class="popup_backdrop" id="popup_backdrop"></div>
            <div class="popup_product_card">
                <div class="popup_product_card_section">
                    <img class="popup_product_card_section_img" src="./assets/${product.imgUrl}" alt="${product.name}">
                </div>
                <div class="popup_product_card_center">
                    <h3>${product.name}</h3>
                    <div class="popup_product_card_center_social">
                        <div class="popup_product_card_center_social_ico">
                            <img src="assets/icons/like_filled_red.svg" alt="like filled icon">
                        </div>
                        <div class="popup_product_card_center_social_rate">
                            <p>
                                <strong id="popup_product_card_center_social_rate">${product.orderInfo.reviews}</strong>
                                <span>Positive reviews</span>
                            </p>
                            <p>Above average</p>
        
                        </div>
                        <div class="popup_product_card_center_social_orders">
                            <p>
                                <strong id="popup_product_card_center_social_orders">${product.orderInfo.inStock}</strong>
                            </p>
                            <p>orders</p>
                        </div>
                    </div>
                    <ul class="popup_product_card_center_options">
                        <li>
                            <div>Color: <span>${product.color.map((value => ` ${value}`))}</span></div>
                        </li>
                        <li>
                            <div>Operating System: <span>${product.os}</span></div>
                        </li>
                        <li>
                            <div>Chip: <span>${product.chip.name}</span></div>
                        </li>
                        <li>
                            <div>Height: <span>${product.size.height} cm</span></div>
                        </li>
                        <li>
                            <div>Width: <span>${product.size.width} cm</span></div>
                        </li>
                        <li>
                            <div>Depth: <span>${product.size.depth} cm</span></div>
                        </li>
                        <li>
                            <div>Weight: <span>${product.size.weight}</span></div>
                        </li>
                    </ul>
                </div>
                <div class="popup_product_card_section">
                    <div>
                        <p class="popup_product_card_price">${product.price}$</p>                    
                    </div>
                    <div class="product_card_body_btn">
                        <button id="${btnId}">Add to cart</button>
                    </div>
                </div>
            </div>
      </div>
        `
        return card
    }

    private closeFullCard(e: MouseEvent) {
        document?.getElementById('popup_wrapper')?.parentElement?.remove()
    }
}
