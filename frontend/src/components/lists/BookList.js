/**
 * Created by user on 5/2/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BookCard from '../cards/BookCard';

export default function BookList({ books, deleteBook}) {
/*export default function BookList({ books }) {*/

    const bookList = (
        <div className="ui container">
            <div className="ui three cards">
                {books.map(book => <BookCard book={book} key={book._id} deleteBook={deleteBook} />)}
                {/*{books.map(book => <BookCard book={book} key={book._id} />)}*/}
            </div>
        </div>
    );
    return(
        <div>
            {bookList}
        </div>
    );
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired
}