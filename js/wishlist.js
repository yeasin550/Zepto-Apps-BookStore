// Step 1: Get book IDs from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}
console.log(getWishlist)
// Step 2: Fetch books from Gutenberg API
async function fetchBooks() {
  try {
    const response = await fetch("https://gutendex.com/books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// Step 3: Filter books based on wishlist IDs
function filterBooksByWishlist(books, wishlist) {
  return books.filter((book) => wishlist.includes(book.id));
}

// Step 4: Display the filtered books in cards
function displayBooks(filteredBooks) {
  const bookContainer = document.getElementById("book-list");
  bookContainer.innerHTML = ""; // Clear any existing books

  if (filteredBooks.length === 0) {
    bookContainer.innerHTML = "<p>No books found in your wishlist.</p>";
    return;
  }

  filteredBooks.forEach((book) => {
    // Create card for each book
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-item");

    bookCard.innerHTML = `
      <img src="${book.formats["image/jpeg"]}" alt="${book.title}">
      <h2>${book.title}</h2>
      <p>Author: ${book.authors.map((author) => author.name).join(", ")}</p>
      <p>ID: ${book.id}</p>
    `;

    bookContainer.appendChild(bookCard);
  });
}

// Main function to fetch and display wishlist books
async function loadWishlistBooks() {
  const wishlist = getWishlist(); // Get wishlist IDs from localStorage
  if (wishlist.length === 0) {
    document.getElementById("book-list").innerHTML =
      "<p>Your wishlist is empty.</p>";
    return;
  }

  const books = await fetchBooks(); // Fetch all books from the API
  const filteredBooks = filterBooksByWishlist(books, wishlist); // Filter books by wishlist
  displayBooks(filteredBooks); // Display the filtered books
}

// Call the main function
loadWishlistBooks();
