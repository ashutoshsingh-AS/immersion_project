// DOM Elements
const searchInput = document.getElementById("searchInput");
const productsGrid = document.getElementById("products");
const errorMessage = document.getElementById("error");
const loadingSpinner = document.getElementById("loading");

// API URLs
const BASE_URL = "https://dummyjson.com/products";
const SEARCH_URL = "https://dummyjson.com/products/search";

// State
let searchTimeout;

// Functions
function showLoading() {
  loadingSpinner.style.display = "block";
  errorMessage.style.display = "none";
}

function hideLoading() {
  loadingSpinner.style.display = "none";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

function createProductCard(product) {
  return `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
            </div>
        </div>
    `;
}

async function fetchProducts(url) {
  try {
    showLoading();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    showError("Error loading products. Please try again later.");
    return [];
  } finally {
    hideLoading();
  }
}

async function displayProducts(products) {
  if (products.length === 0) {
    productsGrid.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1;">No products found</p>';
    return;
  }

  productsGrid.innerHTML = products.map(createProductCard).join("");
}

async function handleSearch(event) {
  const query = event.target.value.trim();

  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // If search is empty, show all products
  if (query === "") {
    const products = await fetchProducts(BASE_URL);
    displayProducts(products);
    return;
  }

  // Add delay to prevent too many API calls
  searchTimeout = setTimeout(async () => {
    const products = await fetchProducts(
      `${SEARCH_URL}?q=${encodeURIComponent(query)}`
    );
    displayProducts(products);
  }, 300);
}

// Event Listeners
searchInput.addEventListener("input", handleSearch);

// Initial load
window.addEventListener("load", async () => {
  const products = await fetchProducts(BASE_URL);
  displayProducts(products);
});