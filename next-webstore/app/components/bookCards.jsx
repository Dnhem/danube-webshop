"use client";

import Link from "next/link";
import BookProfile from "./bookProfile";
import { useState, useEffect } from "react";

async function fetchBooks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT_URL}/api/v1/books`);
    const responseJSON = await response.json();
    const books = await responseJSON.data;
    return books;
  } catch (error) {
    console.log(error);
  }
}

const BookCards = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function getBooks() {
      const books = await fetchBooks();
      setBooks(books);
    }

    getBooks();
  }, []);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <>
      {!selectedBook && (
        <div className="right-column">
          {books ? (
            <>
              {books.map((book) => (
                <div
                  className="card"
                  data-test={book.title}
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                >
                  <div
                    data-test="book-div"
                    style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
                  >
                    <h3 style={{ display: "flex", justifyContent: "center" }}>{book.title}</h3>
                    <img
                      style={{ display: "flex", justifyContent: "center" }}
                      src="./gatsbycover.png"
                      width="200"
                      height="200"
                      alt="User profile picture"
                    />
                  </div>

                  <ul>
                    <li> Author: {book.author}</li>
                    <li> Publisher: {book.publisher}</li>
                    <li>Genre: {book.genre}</li>
                    <li> Price: {book.price}</li>
                  </ul>
                  <button className="btn" data-test="add-to-cart">
                    add to cart
                  </button>
                </div>
              ))}
            </>
          ) : (
            <h1>LOADING</h1>
          )}
        </div>
      )}
      {selectedBook && (
        <BookProfile
          id={selectedBook.id}
          author={selectedBook.author}
          publisher={selectedBook.publisher}
          title={selectedBook.title}
          genre={selectedBook.genre}
        />
      )}
    </>
  );
};

export default BookCards;
