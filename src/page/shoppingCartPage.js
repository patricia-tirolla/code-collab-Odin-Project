document.addEventListener("DOMContentLoaded", async () => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    };
  
    // Render products in the cart
    const renderCart = (products) => {
      const cartItemsContainer = document.querySelector(".cart-items");
      cartItemsContainer.innerHTML = ""; // Clear any existing items
  
      products.forEach((product) => {
        const productHTML = `
          <div class="cart-item" data-id="${product.id}">
            <div class="product">
              <img src="${product.image}" alt="${product.title}">
              <span class="product-name">${product.title}</span>
            </div>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="quantity">
              <button class="quantity-decrease" data-id="${product.id}">-</button>
              <input type="number" class="quantity-input" value="1" min="1" data-id="${product.id}">
              <button class="quantity-increase" data-id="${product.id}">+</button>
            </div>
            <div class="subtotal" data-id="${product.id}">$${product.price.toFixed(2)}</div>
          </div>
        `;
        cartItemsContainer.insertAdjacentHTML("beforeend", productHTML);
      });
  
      attachEventListeners(products);
    };
  
    // Add event listeners
    const attachEventListeners = (products) => {
      document.querySelectorAll(".quantity-increase").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = e.target.dataset.id;
          const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
          input.value = parseInt(input.value) + 1;
          updateSubtotal(productId, input.value, products);
        });
      });
  
      document.querySelectorAll(".quantity-decrease").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = e.target.dataset.id;
          const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
          if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            updateSubtotal(productId, input.value, products);
          }
        });
      });
  
      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", (e) => {
          const productId = e.target.dataset.id;
          if (parseInt(input.value) < 1) input.value = 1;
          updateSubtotal(productId, input.value, products);
        });
      });
    };
  
    // Update subtotal for each product
    const updateSubtotal = (productId, quantity, products) => {
      const product = products.find((p) => p.id == productId);
      const subtotal = product.price * parseInt(quantity);
      document.querySelector(`.subtotal[data-id="${productId}"]`).textContent = `$${subtotal.toFixed(2)}`;
      updateTotal(products);
    };
  
    // Update total price
    const updateTotal = (products) => {
      let total = 0;
      document.querySelectorAll(".quantity-input").forEach((input) => {
        const productId = input.dataset.id;
        const product = products.find((p) => p.id == productId);
        total += product.price * parseInt(input.value);
      });
  
      document.querySelector(".totals-subtotal").textContent = `$${total.toFixed(2)}`;
      document.querySelector(".totals-total").textContent = `$${total.toFixed(2)}`;
    };
  
    // Fetch and render products
    const products = await fetchProducts();
    renderCart(products);
  });
  