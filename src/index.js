import "./styles.css";
import { productList } from "./productList";

document.addEventListener("DOMContentLoaded", () => {
  const createProductList = productList(
    "product-container",
    "product-list-template"
  );

  createProductList.displayData("https://fakestoreapi.com/products?limit=20");
});
