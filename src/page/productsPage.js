import productTemplate from "../template/product.ejs";
import partials from "../partials"
import images from "../images"
import { addProductToShoppingCart } from "./shoppingCartPage";

async function renderProduct(urlPath) {
    let productId = urlPath.substring("#/products/".length)
    let res = await fetch('https://fakestoreapi.com/products/' + productId);
    if (!res.ok) {
        throw new Error("Unable to fetch product: server responded with " + res.status)
    }
    let json = await res.json();

    document.querySelector("body").innerHTML = productTemplate({
        product: json,
        formatPrice,
        partials,
        images
    });
    buttonAddToShoppingCart(json);
}

function formatPrice(num) {
    return num.toFixed(2)
}

function buttonAddToShoppingCart(product) {
    const addToCartButton = document.querySelector(".add-to-cart-button");
    const alertBox = document.getElementById("alert-box");
    const alertCloseButton = document.querySelector(".alert-close-button");

    addToCartButton.addEventListener("click", () => {
        addProductToShoppingCart(product);

        alertBox.classList.remove("hidden");
        alertCloseButton.addEventListener("click", () => {
            alertBox.classList.add("hidden");
        });
    });
}

export default { renderProduct: renderProduct }