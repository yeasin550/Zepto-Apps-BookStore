// Global variables
let allBooks = [];
let filteredBooks = [];
let currentPage = 1;
const booksPerPage = 16;

// Fetch data from the Gutenberg API
fetch("https://gutendex.com/books")
  .then((response) => response.json())
  .then((data) => {
    allBooks = data.results;
    filteredBooks = allBooks; // Initialize filteredBooks with allBooks

    populateDropdowns(); // Populate genre and topic dropdowns
    displayBooks(filteredBooks, currentPage); // Display books on the current page
    setupPagination(filteredBooks.length);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Search functionality: filter books by title
  document.querySelector(".search-input").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reset to the first page
    displayBooks(filteredBooks, currentPage);
    setupPagination(filteredBooks.length);
  });

  // Filter by genre
  document.querySelector("#genre-list").addEventListener("click", (event) => {
    const genre = event.target.textContent;
    filteredBooks = allBooks.filter((book) => book.subjects.includes(genre));
    currentPage = 1; // Reset to the first page
    displayBooks(filteredBooks, currentPage);
    setupPagination(filteredBooks.length);
  });

  // Filter by topic
  document.querySelector("#topic-list").addEventListener("click", (event) => {
    const topic = event.target.textContent;
    filteredBooks = allBooks.filter((book) => book.bookshelves.includes(topic));
    currentPage = 1; // Reset to the first page
    displayBooks(filteredBooks, currentPage);
    setupPagination(filteredBooks.length);
  });

  // All Filter: Show all books
  document.querySelector("#all-book-list").addEventListener("click", () => {
    filteredBooks = allBooks; // Reset to all books
    currentPage = 1; // Reset to the first page
    displayBooks(filteredBooks, currentPage);
    setupPagination(filteredBooks.length);
  });
});


// Function to get wishlist from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

// Function to save wishlist to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Function to toggle wishlist for a specific book
function toggleWishlist(bookId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(bookId);

  if (index === -1) {
    wishlist.push(bookId); // Add to wishlist if not already present
    showToast("Added to wishlist! 💖");
  } else {
    wishlist.splice(index, 1); // Remove from wishlist if already present
    showToast("Removed from wishlist! 🤍");
  }

  saveWishlist(wishlist);
}

// Function to check if a book is in the wishlist
function isWishlisted(bookId) {
  const wishlist = getWishlist();
  return wishlist.includes(bookId);
}

// Function to show toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Show the toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove the toast element from the DOM after it's hidden
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500); // Wait for the hide transition to finish
  }, 3000);
}



// Function to display books for the current page
function displayBooks(books, page) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = ""; // Clear existing book list

  const start = (page - 1) * booksPerPage;
  const end = page * booksPerPage;
  const booksToDisplay = books.slice(start, end);

  booksToDisplay.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const coverImage =
      book.formats["image/jpeg"] || "https://via.placeholder.com/150";

    const isBookWishlisted = isWishlisted(book.id);
    const wishlistClass = isBookWishlisted ? "liked" : "unliked";

    bookItem.innerHTML = `
      <img src="${coverImage}" alt="Book Cover">
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${
        book.authors.length > 0 ? book.authors[0].name : "Unknown"
      }</p>
      <p><strong>Genre:</strong> ${
        book.subjects.length > 0 ? book.subjects[0] : "Unknown"
      }</p>
       <p class="id"><strong>ID:</strong> ${book.id}</p>
      <span class="wishlist-icon ${wishlistClass}" data-book-id="${book.id}">
      ${isBookWishlisted ? "💖" : "🤍"}
      </span>
      `;
     

    bookList.appendChild(bookItem);
  });

  updatePaginationActiveState(page);

  // Add click event listeners to all wishlist icons
  document.querySelectorAll(".wishlist-icon").forEach((icon) => {
    icon.addEventListener("click", function () {
      const bookId = parseInt(this.getAttribute("data-book-id"), 10);
      toggleWishlist(bookId);
      displayBooks(books, page); // Re-render the books to update the wishlist state
    });
  });
}


// Set up pagination buttons
function setupPagination(totalBooks) {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  document.getElementById("previous-btn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayBooks(filteredBooks, currentPage);
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayBooks(filteredBooks, currentPage);
    }
  });

  document.querySelectorAll(".pagination-btn").forEach((btn, index) => {
    if (index > 0 && index <= totalPages) {
      btn.addEventListener("click", () => {
        currentPage = index;
        displayBooks(filteredBooks, currentPage);
      });
    }
  });
}

// Update active state for pagination
function updatePaginationActiveState(activePage) {
  document.querySelectorAll(".pagination-btn").forEach((btn, index) => {
    if (index === activePage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Populate genre and topic dropdowns
function populateDropdowns() {
  const genreList = document.getElementById("genre-list");
  const topicList = document.getElementById("topic-list");
  const allBookList = document.getElementById("all-book-list");

  const genres = new Map(); 
  const topics = new Map();

  allBooks.forEach((book) => {
    // Count genres
    book.subjects.forEach((subject) => {
      if (genres.has(subject)) {
        genres.set(subject, genres.get(subject) + 1);
      } else {
        genres.set(subject, 1);
      }
    });

    // Count topics
    book.bookshelves.forEach((bookshelf) => {
      if (topics.has(bookshelf)) {
        topics.set(bookshelf, topics.get(bookshelf) + 1);
      } else {
        topics.set(bookshelf, 1);
      }
    });
  });

  // Add "All" button for resetting filters
  const allLi = document.createElement("li");
  allLi.textContent = "All Books";
  allBookList.appendChild(allLi);

  // Add genre filters only if there's at least one book with that genre
  genres.forEach((count, genre) => {
    if (count > 0) {
      const li = document.createElement("li");
      li.textContent = genre;
      genreList.appendChild(li);
    }
  });

  // Add topic filters only if there's at least one book with that topic
  topics.forEach((count, topic) => {
    if (count > 0) {
      const li = document.createElement("li");
      li.textContent = topic;
      topicList.appendChild(li);
    }
  });
}





// animation
// Load the Lottie animation from the assets folder
document.addEventListener("DOMContentLoaded", function () {
  var animation = lottie.loadAnimation({
    container: document.getElementById("lottie-animation"), // the div to load the animation into
    path: "./assets/Animation - 1728895184900.json", // path to the animation JSON file
    renderer: "svg",
    loop: true, // animation will loop
    autoplay: true, // starts playing automatically
  });

  // Wait for 500ms (1/2 second) before hiding the loading screen
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("loading").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 2500); // 500ms = 1/2 second
  });
});



// Home route
document.getElementById("homeLink").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default anchor behavior

  // Show home content and hide other pages' content
  document.getElementById("homeContent").style.display = "block";
  document.getElementById("content").style.display = "none";
});

// Book Page route
document.getElementById("bookPageLink").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default anchor behavior

  // Load the content of bookPage.html into the content div
  loadPage("bookPage.html");
});

// Wishlist Page route
document.getElementById("wishlistLink").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default anchor behavior

  // Load the content of wishlistPage.html into the content div
  loadPage("wishlistPage.html");
});

function loadPage(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Hide the home content and show the new page content
      document.getElementById("homeContent").style.display = "none";
      document.getElementById("content").style.display = "block";
      document.getElementById("content").innerHTML = data; // Inject the new content
    })
    .catch((error) => {
      console.error("Error loading the page:", error);
    });
}

