
const BookPage = () => {
    return (
        <div>
            <div className="product-card">
                <div className="product-image">
                    <img src="https://img.freepik.com/free-photo/red-hardcover-book-front-cover_1101-833.jpg?t=st=1729003599~exp=1729007199~hmac=1db0d169dc06ae9f33434e8952f06180ed0d118b2b7ebe0af49fc612efe4e488&w=360" alt="About the First Night" />
                </div>
                <div className="product-info">
                    <h2 className="product-title">1. Romeo and Juliet</h2>
                    <h2 className="product-title">Author : William Shakespeare</h2>
                    <p className="product-description">A long established fact that a reader will be distracted by the readable content
                        of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed...</p>
                    <div className="product-price">
                        1564 - 1616_year
                    </div>
                    <div className="product-actions">
                        {/* <!-- <button class="action-button">♡</button> --> */}
                        <button className="action-button primary">Add to book</button>
                        <button className="action-button primary">Buy to book</button>
                        {/* <!-- <button class="action-button">↻</button> --> */}
                    </div>
                </div>
            </div>



            <div className="flex gap-4 max-w-md my-12 ml-12 border-2 border-red-600 p-4 bg-white rounded-lg">
                {/* Book cover image */}
                <div className="w-32 flex-shrink-0">
                    <img
                        src="https://img.freepik.com/free-photo/red-hardcover-book-front-cover_1101-833.jpg?t=st=1729003599~exp=1729007199~hmac=1db0d169dc06ae9f33434e8952f06180ed0d118b2b7ebe0af49fc612efe4e488&w=360"
                        alt="Book Cover"
                        className="w-full h-auto rounded-sm shadow-md"
                    />
                </div>

                {/* Book details */}
                <div className="flex flex-col flex-grow">
                    {/* Kindle label */}
                    <span className="text-sm text-pink-500 font-medium mb-1">
                        KINDLE
                    </span>

                    {/* Book title */}
                    <h2 className="text-lg font-medium text-gray-900 mb-1">
                        Angry God (All Saints High Book 3)
                    </h2>

                    {/* Author name */}
                    <p className="text-sm text-gray-600 mb-3">
                        L.J. Shen
                    </p>

                    {/* Price section */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">$1.30</span>
                        <span className="text-sm text-gray-500 line-through">$1.75</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;