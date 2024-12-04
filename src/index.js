import "./styles.css";
import "./styles/productDetails.css"

import homeTemplate from "./template/home.ejs";
import cartTemplate from "./template/cart.ejs";

import { productList } from "./productList";
import productPage from "./page/productsPage";
import partials from "./partials";

const createProductList = productList(
    "product-container",
    "product-list-template"
);

// ------- function and event to render the pages
window.addEventListener("popstate", () => {
    renderPage(window.location.hash);
})

function renderPage(urlPath) {
    if (urlPath == "#/cart-page") {
        document.querySelector("body").innerHTML = cartTemplate();

    } else if (urlPath.startsWith("#/products/")) {
        productPage.renderProduct(urlPath);
    } else {
        document.querySelector("body").innerHTML = homeTemplate({ partials });
        createProductList.displayData("https://fakestoreapi.com/products?limit=20");
    }
}
renderPage(window.location.hash);
