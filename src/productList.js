import "./productList.css"

export const productList = (containerId, templateId) => {
  

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("json data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const formatPrice = (num) => {
    return num.toFixed(2);
  };

  const formatLength = (str) => {
    if (str.length <= 100) {
      return str;
    } else {
      return str.slice(0, 100) + "...";
    }
  };

  const handleAddButtonClick = (event) => {
event.preventDefault()

console.log("item added to cart")
  }
  const displayData = async (url) => {
    const productSection = document.getElementById(containerId);


    const data = await fetchData(url);
    console.log("data from fetch:", data);

    data.forEach((product) => {
      const template = document.getElementById(templateId);
      const clone = template.content.cloneNode(true);

      const productImage = clone.querySelector(".product-image");
      productImage.setAttribute("src", product.image);

      const productLink = clone.querySelector(".product-link");
      productLink.href = "#/products/" + product.id;

      const productTitle = clone.querySelector(".product-title");
      productTitle.textContent = product.title;

      const productDescription = clone.querySelector(".product-description");
      const description = product.description;
      const truncatedString = formatLength(description);
      productDescription.textContent = truncatedString;

      const productPrice = clone.querySelector(".product-price");
      const number = product.price;
      const formattedPrice = formatPrice(number);

      productPrice.textContent = `$${formattedPrice}`;

      const addButton = clone.querySelector(".add-button");
      addButton.textContent = addButton.textContent.toUpperCase();

      addButton.addEventListener("click", handleAddButtonClick)

      productSection.appendChild(clone);
    });
  };




  

  return {
    displayData,
  };
};
