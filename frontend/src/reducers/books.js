/**
 * Created by user on 4/23/18.
 */
import { createSelector } from 'reselect';
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_DELETED } from '../types';

export default function books(state = {}, action = []) {
    switch (action.type) {
        case BOOKS_FETCHED:
            console.log(state);
            console.log(action.data.entities.books);
            debugger;
            /*console.log(action);
            debugger*/
            return { ...state, ...action.data.entities.books };
            /*const index = state.findIndex(item => item.books._id === action.book._id);

            if(index > -1){
                return state.map(item => {
                    if (item._id === action.book._id) return action.book;
                    return item;
                });
            } else {
                return [
                    ...state,
                    ...action.data.entities.books
                ]
            }*/
        case BOOK_CREATED:
            return{ ...state, ...action.data.entities.books };
        case BOOK_DELETED:
            return{ ...state, ...action.data.entities.books };
           /* console.log(state);
            debugger;
            console.log(state.books);*/
           /* return state.books.filter((book) => book._id !== action.bookId)*/
            /*return { };*/
        default:
            return state;
    }
}

//Selectors
export const booksSelector = state => state.books;

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);