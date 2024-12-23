import "./styles.css";
import "./style/footer.css";
import "./style/productDetails.css";
import "./style/navbar.css";
import "./style/checkout.css";
import "./style/shoppingCartPage.css";

import homeTemplate from "./template/home.ejs";

import { productList } from "./productList";
import productsPage from "./page/productsPage";
import { loadCartPage} from "./page/shoppingCartPage";
import partials from "./partials";
import images from "./images";

const createProductList = productList(
  "product-container",
  "product-list-template"
);

// ------- function and event to render the pages
window.addEventListener("popstate", () => {
  renderPage(window.location.hash);
});

export function renderPage(urlPath) {
    if (urlPath == "#/cart-page") {
        loadCartPage();
      } else if (urlPath.startsWith("#/products/")) {
        productsPage.renderProduct(urlPath);
      } else {
        const category = "All";
        document.querySelector("body").innerHTML = homeTemplate({
          partials,
          images,
        });
    
        createProductList.renderButtons(
          "https://fakestoreapi.com/products?limit=20"
        );
        createProductList.displayData(
          "https://fakestoreapi.com/products?limit=20",
          "All"
        );
      }
    }
renderPage(window.location.hash);
