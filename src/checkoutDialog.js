
export function showCheckoutModal() {
    const proceedToCheckoutButton = document.querySelector(".checkout-btn");
    const checkoutModal = document.querySelector(".checkout-container");
    proceedToCheckoutButton.addEventListener("click", () => {
        checkoutModal.show();
    })
};