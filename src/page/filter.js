

// Update the price value display
function updatePriceValue(value) {
  document.getElementById('price-value').textContent = `$${value}`;
}

// Handle category button click
function handleCategoryClick(category) {
  document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
  const button = document.querySelector(`.filter-button[data-category="${category}"]`);
  button.classList.toggle('active');
  onFilterChange();
}

// Triggered on any filter change
function onFilterChange() {
  const selectedCategory = document.querySelector('.filter-button.active')?.dataset.category || "";
  const sortValue = document.getElementById('sort-select').value;
  const maxPrice = parseInt(document.getElementById('price-range').value, 10);

  const filterState = { selectedCategory, sortValue, maxPrice };
  applyFilters(products, filterState);
}

// Apply filters to products
function applyFilters(products, filterState) {
  const { selectedCategory, sortValue, maxPrice } = filterState;

  // Filter products
  let filteredProducts = products.filter(product =>
    (selectedCategory === "" || product.category === selectedCategory) &&
    product.price <= maxPrice
  );

  // Sort products
  if (sortValue === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
}

// Render the filtered products (function to implement)
function renderProducts(filteredProducts) {
  // Add logic to render products in the UI
  console.log(filteredProducts); // Placeholder
}
