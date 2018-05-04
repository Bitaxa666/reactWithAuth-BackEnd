/**
 * Created by user on 4/19/18.
 */
import { combineReducers } from 'redux';
import user from "./reducers/user";
import books from "./reducers/books";


export default combineReducers({
    user,
    books
})