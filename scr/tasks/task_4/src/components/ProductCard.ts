import {ProductItem} from "../models/ProductItem.js";

export class ProductCard {
    public static createCard(item: ProductItem): HTMLElement {
        let productItemCard = document.createElement('div')
        productItemCard.className = 'product_card'
        productItemCard.innerHTML = `
            <div class="product_card_body">
        <div class="product_card_body_favorite_ico"></div>
        <div class="product_card_body_photo">
            <img src="assets/${item.imgUrl}" alt="${item.name}">
        </div>
        <p class="product_card_body_title">${item.name}</p>
        <div class="product_card_body_stock">
            <img src="assets/icons/${item.orderInfo.inStock > 0 ? "check.svg" : "close.svg"}" alt="">
            <div><span id="product_card_left_in_stock">${item.orderInfo.inStock}</span> left in stock</div>
        </div>
        <div class="product_card_body_price">
            <span>Price: <strong>${item.price}</strong> $</span>
        </div>
        <div class="product_card_body_btn">
            <button>Add to cart</button>
        </div>
    </div>
    <div class="product_card_footer">
        <div class="product_card_footer_ico">
            <img src="assets/icons/like_filled_red.svg" alt="like filled icon">
        </div>
        <div class="product_card_footer_rate">
            <p>
                <strong id="product_card_footer_rate">${item.orderInfo.reviews}</strong>
                <span>Positive reviews</span>
            </p>
            <p>Above average</p>

        </div>
        <div class="product_card_footer_orders">
            <p>
                <strong id="product_card_footer_orders">${item.orderInfo.inStock}</strong>
            </p>
            <p>orders</p>
        </div>
    </div>
        `
        return productItemCard
    }
}