import "./styles.css";
import { productList } from "./productList";
import homePage from "./pages/home.ejs";
import detailsPage from "./pages/productDetails.ejs"
import cartPage from "./pages/cart.ejs";


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
        document.querySelector("body").innerHTML = cartPage();

    } else if (urlPath.startsWith("#/products/")) {
        let productId = urlPath.substring("#/products/".length)

        fetch('https://fakestoreapi.com/products/' + productId)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                document.querySelector("body").innerHTML = detailsPage({ product: json });
            })
    } else {

        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                document.querySelector("body").innerHTML = homePage({ products: json });
                createProductList.displayData("https://fakestoreapi.com/products?limit=20");
            })
    }
}
renderPage(window.location.hash);
