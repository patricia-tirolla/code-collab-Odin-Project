import "./productList.css";

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

  const filterData = (data, category) => {
    if (category === "All") {
      return data;
    } else {
      return data.filter((item) => item.category === category);
    }
  };

  const displayData = async (url, category) => {
    const productSection = document.getElementById(containerId);
    productSection.innerHTML = "";

    const data = await fetchData(url);
    console.log("data from fetch:", data);

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
    console.log("data from fetch:", data);

    const categories = data.map((item) => item.category);
    console.log("category:", categories);

    const uniqueCategories = ["All", ...new Set(categories)];
    console.log("unique categories:", uniqueCategories);

    // render the category buttons
    uniqueCategories.forEach((category) => {
      const categoryButton = document.createElement("button");
      categoryButton.classList.toggle("category-button");
      const uppercase = category.slice(0, 1).toUpperCase();
      console.log(uppercase);
      const newWord = uppercase + category.slice(1);
      console.log(newWord);
      categoryButton.setAttribute("data-category", category);

      categoryButton.textContent = newWord;
      buttonContainer.appendChild(categoryButton);

      categoryButton.addEventListener("click", (e) => {
        displayData(url, category);
        const buttonCategory = e.target.textContent;
        console.log("button click category:", buttonCategory);

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
