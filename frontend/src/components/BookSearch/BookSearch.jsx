import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../customHook/useAuth";
import { Search, Download, Loader2, Book, ChevronLeft, ChevronRight } from "lucide-react";

import api from "../../api/api";

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await api.get("/api/search/", {
        params: { q: searchQuery },
      });
      setSearchResults(response.data.books);
      if (response.data.books.length === 0) {
        setMessage("No books found. Try a different search term.");
      }
    } catch (error) {
      console.error("Error during search:", error);
      setMessage("Failed to fetch search results. Please try again.");
    }
    setLoading(false);
  };

  const handleDownload = async (url) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await api.post("/api/download/", {
        url: url,
        folder: "MyBooks", // You can replace this with user-defined folder names if required
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error during download:", error);
      setMessage("Failed to download the book. Please try again.");
    }
    setLoading(false);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchResults.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    if (currentPage < Math.ceil(searchResults.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="container  mx-auto  px-4 py-8">
      <div className="text-purple-100 bg-black px-4 rounded-4xl py-8  shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-center  mb-8">
          Book Search and Download
        </h1>
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg mr-2 px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="mx-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center rounded"
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-purple-600">Loading...</span>
        </div>
      )}
      {message && <p className="text-center text-purple-600 mb-4">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {currentBooks.slice(5).map((book, index) => (
          <div
            key={index}
            className="bg-purple-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col md:flex-row items-center md:items-start justify-between"
          >
            <div className="flex items-center mb-4 md:mb-0">
              <Book className="h-10 w-10 text-purple-300 mr-4" />
              <h5 className="text-xl font-semibold text-white">
                {book.title}
              </h5>
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={() => handleDownload(book.link)}
                className="w-full md:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-purple-100 rounded-md flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-400 hover:bg-purple-700 text-purple-100 rounded-md flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" /> Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(searchResults.length / booksPerPage)}
            className="px-4 py-2 bg-purple-400 hover:bg-purple-700 text-purple-100 rounded-md flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            Next <ChevronRight className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
}

export default BookSearch;
