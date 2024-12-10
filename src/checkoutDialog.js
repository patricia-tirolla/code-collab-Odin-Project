import { loadCartPage } from "./page/shoppingCartPage";

export function showCheckoutModal() {
    const proceedToCheckoutButton = document.querySelector(".checkout-btn");
    const checkoutModal = document.querySelector(".checkout-container");
    proceedToCheckoutButton.addEventListener("click", () => {
        checkoutModal.show();
    })
};

export function submitCheckout() {
    document.addEventListener("click", (e) => {
        if (e.target.matches(".place-order-button")) {
            e.preventDefault();
            localStorage.clear();
            loadCartPage();
        }
    })
}