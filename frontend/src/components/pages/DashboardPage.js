/**
 * Created by user on 4/20/18.
 */
import React from 'react';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../../messages/ConfirmEmailMessage';
import PropTypes from 'prop-types';
import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';
import BookList from '../lists/BookList';
import { fetchBooks, deleteBook } from '../../actions/books';
/*import { fetchBooks,  } from '../../actions/books';*/


class DashboardPage extends React.Component {
    componentDidMount = () =>
    this.onInit(this.props);

    onInit = (props) => props.fetchBooks();
    render(){
        const { isConfirmed, books } = this.props;
        return(
            <div>
                { !isConfirmed && <ConfirmEmailMessage />}
                {books.length === 0 ? <AddBookCtA /> : <BookList books = {this.props.books} deleteBook={this.props.deleteBook} />}
                {/*{books.length === 0 ? <AddBookCtA /> : <h1>Your list contains books</h1>}*/}
            </div>
        )
    }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  /*books: PropTypes.arrayOf( PropTypes.shape({
        title: PropTypes.string.isRequired,
        covers: PropTypes.string.isRequired
  }).isRequired).isRequired*/
  books: PropTypes.array.isRequired
};
function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed,
        books: allBooksSelector(state)
    }
    
}
export default connect(mapStateToProps, { fetchBooks, deleteBook })(DashboardPage);