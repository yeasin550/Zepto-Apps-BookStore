import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCard = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const booksPerPage = 12;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://gutendex.com/books');
                const data = await response.json();
                setBooks(data.results);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();

        // Load wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);

    // Filter books based on the search term and filter by genre/topic
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' ||
            (book.subjects && book.subjects.some(subject => subject.toLowerCase().includes(filter.toLowerCase())));

        return matchesSearch && matchesFilter;
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    // Get current page books
    const currentBooks = filteredBooks.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    // Pagination navigation handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Handle filter change
    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        setCurrentPage(1);
        setIsDropdownOpen(false);
    };

    // Toggle wishlist and show toast
    const handleWishlistToggle = (bookId) => {
        const updatedWishlist = wishlist.includes(bookId)
            ? wishlist.filter(id => id !== bookId) // Remove from wishlist
            : [...wishlist, bookId]; // Add to wishlist

        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

        // Show toast notification
        if (wishlist.includes(bookId)) {
            toast.error('Book removed from wishlist!', { position: 'top-right' });
        } else {
            toast.success('Book added to wishlist!', { position: 'top-right' });
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto my-12">
            {/* Toast Container */}
            <ToastContainer />

            {/* Header */}
            <div className="md:flex justify-between items-center py-14 mx-auto">
                <h1 className="text-3xl font-bold md:text-left text-center">All Book List</h1>
                <div className="flex items-center gap-3 pl-5">
                    <input
                        className="p-2 rounded-md text-base border border-black"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="relative inline-block">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="bg-indigo-600 text-white p-2 text-base font-bold rounded-md cursor-pointer"
                        >
                            {filter === 'All' ? 'Default Filter' : filter}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute bg-gray-100 min-w-[160px] shadow-md z-10 mt-2">
                                <div className="px-3">
                                    <strong>All</strong>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            className="py-2 hover:bg-gray-300 cursor-pointer"
                                            onClick={() => handleFilterChange('All')}
                                        >
                                            All Books
                                        </li>
                                    </ul>
                                </div>
                                <div className="px-3">
                                    <strong>Filter By Genres</strong>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            className="py-2 hover:bg-gray-300 cursor-pointer"
                                            onClick={() => handleFilterChange('Fiction')}
                                        >
                                            Fiction
                                        </li>
                                    </ul>
                                </div>
                                <div className="px-3">
                                    <strong>Filter By Topics</strong>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            className="py-2 hover:bg-gray-300 cursor-pointer"
                                            onClick={() => handleFilterChange('Science')}
                                        >
                                            Science
                                        </li>
                                        <li
                                            className="py-2 hover:bg-gray-300 cursor-pointer"
                                            onClick={() => handleFilterChange('History')}
                                        >
                                            History
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Book Cards */}
            <div className="container mx-auto py-4">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {currentBooks.length > 0 ? (
                        currentBooks.map((book) => (
                            <div
                                key={book.id}
                                className="relative flex gap-4 max-w-md border border-gray-400 hover:border-red-600 p-4 bg-white rounded-lg"
                            >
                                {/* Wishlist Icon */}
                                <div
                                    onClick={() => handleWishlistToggle(book.id)}
                                    className="absolute top-0 right-0 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={wishlist.includes(book.id) ? 'red' : 'white'}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-8 h-8 text-red-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364l-7.682 7.682a.75.75 0 01-1.06 0L4.318 12.682a4.5 4.5 0 010-6.364z"
                                        />
                                    </svg>
                                </div>
                                {/* Cover Image */}
                                <div className="w-32 flex-shrink-0">
                                    <img
                                        src={book.formats['image/jpeg'] || 'https://via.placeholder.com/150'}
                                        alt={book.title}
                                        className="w-full h-48 rounded-sm shadow-md"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <h2 className="text-lg font-medium text-gray-900 mb-1">{book.title}</h2>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Author:</span>{' '}
                                        {book.authors.length > 0 ? book.authors[0].name : 'Unknown'}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-bold">Genre: </span>{' '}
                                        {book.subjects.length > 0 ? book.subjects[0] : 'N/A'}
                                    </p>
                                    <p className="text-gray-500">
                                        <span className="font-bold">ID: </span> {book.id}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-3xl font-bold text-purple-500 text-center">Loading books.....!</h1>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-8">
                <div className="flex justify-end">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`mx-1 px-3 py-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} font-medium rounded-md`}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 px-3 py-2 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} font-medium rounded-md`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`mx-1 px-3 py-2 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} font-medium rounded-md`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
