import cartTemplate from "../template/cart.ejs";
import partials from "../partials";
import { showCheckoutModal, submitCheckout } from "../checkoutDialog";
import images from "../images"

export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("shoppingCart");
    if (cart === null) {
        return [];
    }
    return JSON.parse(cart);
};

export function addProductToShoppingCart(product) {
    let shoppingCart = getCartFromLocalStorage();

    shoppingCart.push(product);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
};

function removeProductFromShoppingCart(index) {
    let shoppingCart = getCartFromLocalStorage();

    shoppingCart.splice(index, 1);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
};

function removeItemFromCartButton() {
    const removeButtonList = document.querySelectorAll(".remove-item-btn");
    removeButtonList.forEach(button => {
        button.addEventListener("click", () => {
            removeProductFromShoppingCart(button.dataset.index);
            loadCartPage();
        })
    });
};

function sumCartItems() {
    return {
        getPriceList(list) {
            let itemsPrice = [];
            for (let i = 0; i < list.length; i++) {
                itemsPrice.push(list[i].price);
            }
            return itemsPrice;
        },
        sumProductsInTheCart(priceList) {
            let sum = 0;
            for (let i = 0; i < priceList.length; i++){
                sum += priceList[i];
            }
            return sum;
        },
        priceList() {
            return this.getPriceList(getCartFromLocalStorage());
        },
        subtotal() {
            return this.sumProductsInTheCart(this.priceList());
        },
        discount() {
            return 0;
        },
        total() {
            return (this.subtotal() + this.discount());
        }
    }
};

export const cartTotals = sumCartItems();

export function loadCartPage() {
    document.querySelector("body").innerHTML = cartTemplate({
        partials, cart: getCartFromLocalStorage(), 
        subtotal: cartTotals.subtotal(), 
        total: cartTotals.total(),
        images
    });

    removeItemFromCartButton();
    showCheckoutModal();
    submitCheckout();
};
