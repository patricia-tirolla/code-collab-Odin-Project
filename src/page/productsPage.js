import productTemplate from "../template/product.ejs";
import partials from "../partials"
import images from "../images"
import { addProductToShoppingCart } from "./shoppingCartPage";

async function renderProduct(urlPath) {
    let productId = urlPath.substring("#/products/".length)
    let res = await fetch('https://fakestoreapi.com/products/' + productId);
    let json = await res.json();

    document.querySelector("body").innerHTML = productTemplate({
        product: json,
        formatPrice,
        partials,
        images
    });
    buttonAddToShoppingCart(json);
}

export default { renderProduct: renderProduct }

function formatPrice(num) {
    return num.toFixed(2)
}

function buttonAddToShoppingCart(product) {
    const addToCartButton = document.querySelector(".add-to-cart-button");
    addToCartButton.addEventListener("click", () => {
        addProductToShoppingCart(product);
    })
}