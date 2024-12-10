import "./productList.css";
export const formatPrice = (num) => {
  return num.toFixed(2);
};

export const formatLength = (str) => {
  if (str.length <= 100) {
    return str;
  } else {
    return str.slice(0, 100) + "...";
  }
};

export const filterData = (data, category) => {
  if (category === "All") {
    return data;
  } else {
    return data.filter((item) => item.category === category);
  }
};

export const productList = (containerId, templateId) => {
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const displayData = async (url, category) => {
    const productSection = document.getElementById(containerId);
    productSection.innerHTML = "";

    const data = await fetchData(url);

    const filteredData = filterData(data, category);
    //render the product card
    filteredData.forEach((product) => {
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
      productSection.appendChild(clone);
    });
  };

  const renderButtons = async (url) => {
    const buttonContainer = document.getElementById("button-container");

    const data = await fetchData(url);

    const categories = data.map((item) => item.category);

    const uniqueCategories = ["All", ...new Set(categories)];

    // render the category buttons
    uniqueCategories.forEach((category) => {
      const categoryButton = document.createElement("button");
      categoryButton.classList.toggle("category-button");
      const uppercase = category.slice(0, 1).toUpperCase();
      const newWord = uppercase + category.slice(1);
      categoryButton.setAttribute("data-category", category);

      categoryButton.textContent = newWord;
      buttonContainer.appendChild(categoryButton);

      categoryButton.addEventListener("click", (e) => {
        displayData(url, category);
        const buttonCategory = e.target.textContent;

        const h1 = document.getElementById("category-h1");
        h1.textContent = `${buttonCategory}`;
      });
    });
  };

  return {
    displayData,
    renderButtons,
  };
};
