const shoppingCart = [];

export function addProductToShoppingCart(productId) {
    shoppingCart.push(productId);
    console.log("it's added to cart!", shoppingCart)
}
