/**
 * Created by user on 5/2/18.
 */
import React from 'react';
import PropTypes from 'prop-types';


export default function BookCard({ book, deleteBook }) {
    return (
        <div className="ui card">
            <div className="image">
                <img src={book.cover} alt = "Book Cover" />
            </div>
            <div className="content">
                <div className="header">{book.title}</div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    {/*<Link to={`/game/${game._id}`} className="ui basic button green">Edit</Link>*/}
                    <div className="ui basic button red" onClick={
                                    () => deleteBook(book._id)}>Delete</div>
                </div>
            </div>
        </div>
    );
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired
}