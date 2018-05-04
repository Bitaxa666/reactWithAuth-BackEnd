/**
 * Created by user on 4/24/18.
 */
import api from '../api';
import { normalize } from 'normalizr';
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_DELETED} from "../types";
import { bookSchema } from '../schemas';

const booksFetched = (data) => ({
   type: BOOKS_FETCHED,
    data
});

const bookCreated = (data) => ({
    type: BOOK_CREATED,
    data
});


const bookDeleted = (bookId) => ({
    type: BOOK_DELETED,
    bookId
});


export const fetchBooks = () => (dispatch) =>
    api.books
        .fetchAll()
        .then(books => dispatch(booksFetched(normalize(books, [bookSchema])))
    );
export const createBook = (data) => (dispatch) =>
    api.books
        .create(data)
        .then(book => dispatch(bookCreated(normalize(book, bookSchema)))
        );


export const deleteBook = (id) =>(dispatch) =>
    api.books
        .deleteOne(id)
        .then(book => dispatch(bookDeleted(id)))
        .catch(err => console.error(err.message));
