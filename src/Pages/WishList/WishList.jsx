import { useEffect, useState } from 'react';

const WishList = () => {
    const [books, setBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Fetch the books
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

        // Get wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);

    // Filter books that are in the wishlist
    const wishlistBooks = books.filter(book => wishlist.includes(book.id));

    return (
        <div className="max-w-[1200px] mx-auto my-12">
            <h1 className="text-3xl font-bold text-center my-5">Your Wishlist</h1>
            {wishlistBooks.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {wishlistBooks.map(book => (
                        <div key={book.id} className="flex gap-4 max-w-md border border-gray-400 hover:border-red-600 p-4 bg-white rounded-lg">
                            {/* Book cover image */}
                            <div className="w-32 flex-shrink-0">
                                <img
                                    src={book.formats['image/jpeg'] || 'https://via.placeholder.com/150'}
                                    alt={book.title}
                                    className="w-full h-48 rounded-sm shadow-md"
                                />
                            </div>

                            {/* Book details */}
                            <div className="flex flex-col flex-grow">
                                {/* Kindle label */}
                                {/* <span className="text-sm text-red-500 font-medium mb-1">
                                    KINDLE
                                </span> */}

                                {/* Book title */}
                                <h2 className="text-lg font-medium text-gray-900 mb-1">
                                    {book.title}
                                </h2>

                                {/* Author name */}
                                <p className="text-gray-700">
                                    <span className="font-bold">Author:</span>
                                    {book.authors.length > 0 ? book.authors[0].name : 'Unknown'}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-bold">Genre: </span>
                                    {book.subjects.length > 0 ? book.subjects[0] : 'N/A'}
                                </p>
                                <p className="text-gray-500">
                                    <span className="font-bold">ID: </span> {book.id}
                                </p>

                                {/* <div className="mt-5">
                                    <h2 className="text-xl mb-2 font-semibold">{book.title}</h2>
                                    <p className="text-gray-700">
                                        <span className="font-bold">Author:</span>
                                        {book.authors.length > 0 ? book.authors[0].name : 'Unknown'}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-bold">Genre: </span>
                                        {book.subjects.length > 0 ? book.subjects[0] : 'N/A'}
                                    </p>
                                    <p className="text-gray-500">
                                        <span className="font-bold">ID: </span> {book.id}
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-2xl font-bold text-center text-red-500">Your wishlist is loading...!</h2>
            )}
        </div>
    );
};

export default WishList;
