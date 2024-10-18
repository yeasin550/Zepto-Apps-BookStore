import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookPage = () => {
    const { id } = useParams(); // Get the dynamic ID from the URL
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://gutendex.com/books/${id}`); // Fetch book details using the ID
                const data = await response.json();
                setBook(data); // Set the fetched book data
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]); // Re-fetch if the ID changes

    if (!book) {
        return <h1>Loading...</h1>; // Display loading state
    }

    return (
        <div className="max-w-[1200px] mx-auto my-12 p-4 border border-purple-500 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 flex items-center">{book.title} (<p><strong className="mr-2">ID:</strong> {book.id}</p>)
            </h1> 
            <div className="md:flex gap-4">
                <img src={book.formats['image/jpeg'] || 'https://via.placeholder.com/150'} alt={book.title} className="md:w-64 w-full h-auto rounded-sm shadow-md" />
                <div className="md:w-2/3 text-lg space-y-2">
                    <p><strong className="mr-2">Author:</strong> {book.authors.length > 0 ? book.authors[0].name : 'Unknown'}</p>
                    <p className="flex items-center"><strong className="mr-2">Birth & Death : </strong>
                        <span className="flex items-center">

                            {book.authors.length > 0 ? book.authors[0].birth_year : 'Unknown'} -
                            {book.authors.length > 0 ? book.authors[0].death_year : 'Unknown'}
                        </span>
                    </p>
                    <p><strong className="mr-2">Genres:</strong> {book.subjects.join(', ') || 'N/A'}</p>
                    
                    <p><strong className="mr-2">Downloaded:</strong>
                        {book.download_count || 'Not available.'}
                    </p>
                    <p><strong className="mr-2">Subjects:</strong>
                        {book.subjects || 'Not available.'}
                    </p>
                    <p><strong className="mr-2">Bookshelves:</strong>
                        {book.bookshelves || 'Not available.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
