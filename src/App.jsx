//Importing all the libraries from react
import React, { useState, useEffect } from 'react';
import  Registerpage  from "./registerpage";
//Initialising the variables(APS documentations)
const apiUrl = 'https://reactnd-books-api.udacity.com/books';
const headers = { 'Authorization': 'whatever-you-want' };
import "./App.css"

//Main function
function App() {
  //Using hooks
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  //For registration form visiblity
  const openForm = () => {
    setVisible(true);
  };

  const closeForm = () => {
    setVisible(false);
  };
//TO fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch(apiUrl, { headers })
      .then(response => response.json())
      .then(data => {
        const booksData = Array.isArray(data.books) ? data.books : [];
        setBooks(booksData);
        console.log(booksData);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  };
  //Handle search functions
  const handleSearch = () => {
    return books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value.trim());
  };
  // the dom contetnts
  return (

    <div className="App">
      {/* Header of the page */}
      <div className='nav-bar'>
        <img src="https://kalvium.com/wp-content/uploads/2022/07/fav.png" alt="" />
        <h1>Kalvium Books</h1>
        <div className='reg-btn'>
        </div>
      </div>
      <button
          className="register"
          onClick={openForm}
        >Register
        </button>

      <div className='search-bar'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search by title"
        />
      </div>
      {/* book lists */}
      <div className="book-list">
        {handleSearch().map(book => (
          <div key={book.id} className="book-card">
            {book.imageLinks && book.imageLinks.thumbnail && (
              <img className='book-image' src={book.imageLinks.thumbnail} alt={`Cover of ${book.title}`} />
            )}
            <div className='texts'>
              <h2>{book.title}</h2>
              <p>{book.authors.join(', ')}</p>
              <p  id='rating'>{book.averageRating}⭐️</p>
            </div>
          </div>
        ))}
      </div>

    {/* For the visiblity of registration form */}
      {visible && (
    <div className="modal">
      <div className="modal-content">
        <span  className="close" onClick={closeForm}>
          &times;
        </span>
        <div>    
          <Registerpage />
        </div>
    
      </div>
    </div>
  )}
    </div>

  );
}

export default App;