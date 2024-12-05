export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("shoppingCart");
    if (cart === null) {
        return [];
    }
    return JSON.parse(cart);
}

export function addProductToShoppingCart(product) {
    let shoppingCart = getCartFromLocalStorage();
    shoppingCart.push(product);
    console.log("it's added to cart!", shoppingCart)
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

export function removeProductFromShoppingCart(productId) {
    shoppingCart.slice(productId, 1);
    console.log("It's removed from cart!", shoppingCart)
}

export function sumCart() {
    getCartFromLocalStorage()
    
}