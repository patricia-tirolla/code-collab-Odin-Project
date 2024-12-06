//import cartPage from "../template/cart.ejs"; 
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
  console.log(shoppingCart);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}


//document.addEventListener("DOMContentLoaded", async () => {
    
    /* try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        return products;
      } catch (error) {
        consolconst fetchProducts = async () => {
     e.error("Error fetching products:", error);
        return [];
      }
    };*/
  
    // Render products in the cart
    // export const renderCart = (products) => {
    //   const cartItemsContainer = document.querySelector(".cart-items");
    //   //cartItemsContainer.innerHTML = ""; // Clear any existing items
  

    //   products.forEach((product) => {
    //     const productHTML = `
    //       <div class="cart-item" data-id="${product.id}">
    //         <div class="product">
    //           <img src="${product.image}" alt="${product.title}">
    //           <span class="product-name">${product.title}</span>
    //         </div>
    //         <div class="price">$${product.price.toFixed(2)}</div>
    //         <div class="quantity">
    //           <button class="quantity-decrease" data-id="${product.id}">-</button>
    //           <input type="number" class="quantity-input" value="1" min="1" data-id="${product.id}">
    //           <button class="quantity-increase" data-id="${product.id}">+</button>
    //         </div>
    //         <div class="subtotal" data-id="${product.id}">$${product.price.toFixed(2)}</div>
    //       </div>
    //     `;
    //     cartItemsContainer.appendChild(productHTML);
    //   });
    //   attachEventListeners(products);
    // };
    
  
    // Add event listeners
    // export const attachEventListeners = (products) => {
    //   document.querySelectorAll(".increase").forEach((button) => {
    //     button.addEventListener("click", (e) => {
    //       const productId = e.target.dataset.id;
    //       const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
    //       input.value = parseInt(input.value) + 1;
    //       updateSubtotal(productId, input.value, products);
    //     });
    //   });
  
    //   document.querySelectorAll(".quantity-decrease").forEach((button) => {
    //     button.addEventListener("click", (e) => {
    //       const productId = e.target.dataset.id;
    //       const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
    //       if (parseInt(input.value) > 1) {
    //         input.value = parseInt(input.value) - 1;
    //         updateSubtotal(productId, input.value, products);
    //       }
    //     });
    //   });
  
    //   document.querySelectorAll(".quantity-input").forEach((input) => {
    //     input.addEventListener("change", (e) => {
    //       const productId = e.target.dataset.id;
    //       if (parseInt(input.value) < 1) input.value = 1;
    //       updateSubtotal(productId, input.value, products);
    //     });
    //   });
    // };
  
    // Update subtotal for each product
    // export const updateSubtotal = (productId, quantity, products) => {
    //   const product = products.find((p) => p.id == productId);
    //   const subtotal = product.price * parseInt(quantity);
    //   document.querySelector(`.subtotal[data-id="${productId}"]`).textContent = `$${subtotal.toFixed(2)}`;
    //   updateTotal(products);
    // };
  
    // // Update total price
    // const updateTotal = (products) => {
    //   let total = 0;
    //   document.querySelectorAll(".quantity-input").forEach((input) => {
    //     const productId = input.dataset.id;
    //     const product = products.find((p) => p.id == productId);
    //     total += product.price * parseInt(input.value);
    //   });
  
    //   document.querySelector(".totals-subtotal").textContent = `$${total.toFixed(2)}`;
    //   document.querySelector(".totals-total").textContent = `$${total.toFixed(2)}`;
    // };
  
    // Fetch and render products
    //const products = await fetchProducts();
    //renderCart(getCartFromLocalStorage());
  //});
  
export function updateCartTotals() {
    const cartItems = document.querySelectorAll("#cart-items tr");
    let subtotal = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector("td:nth-child(2)").textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector(".quantity").textContent);
        const subtotalCell = item.querySelector("td:nth-child(4)");

        subtotal += price * quantity;
        subtotalCell.textContent = `$${(price * quantity).toFixed(2)}`;
    });

    // Update subtotal and total
    document.querySelector(".cart-totals table tr:nth-child(1) td:nth-child(2)").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(".cart-totals table tr:nth-child(2) td:nth-child(2)").textContent = `$${(subtotal * 1.1).toFixed(2)}`; // Adding 10% tax for the total
}

document.addEventListener("DOMContentLoaded", () => {
    //increasing quantity
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            const quantitySpan = document.querySelector(`#item-${index} .quantity`);
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
            updateCartTotals();
        });
    });

    // decreasing quantity
    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            const quantitySpan = document.querySelector(`#item-${index} .quantity`);
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
            }
            updateCartTotals();
        });
    });

    // remove item
    document.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            const row = document.querySelector(`#item-${index}`);
            row.remove();
            updateCartTotals();
        });
    });

    // Initial update of totals
    updateCartTotals();
});