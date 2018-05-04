/**
 * Created by user on 4/23/18.
 */
import React from 'react';
import axios from 'axios';
import { Form,Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/* eslint-disable */
class SearchBookForm extends React.Component {
    state = {
        query: '',
        loading: false,
        options: [],
        books: {}
    };

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            /*query: data*/
           query: e.target.value
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    };

    onChange = (e, data) => {
        this.setState({ query: data.value });
        this.props.onBookSelect(this.state.books[data.value]);
    };

    fetchOptions = () => {
        if (!this.state.query) return;
        this.setState ({ loading: true});
        axios.get(`/api/books/search?q=${this.state.query}`)
            .then(res => res.data.books)
            .then(books => {
                const options = [];
                const booksHash ={};
                books.forEach(book => {
                    booksHash[book.goodreadsId] = book;
                    options.push ({
                        key: book.goodreadsId,
                        value: book.goodreadsId,
                        text: book.title
                    });
                });
                this.setState({ loading: false, options, books: booksHash })
            });
    };

    render() {
        return (
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder="Search for a book by title"
                    value={this.state.query}
                    onSearchChange={this.onSearchChange}
                    loading={this.state.loading}
                    options={this.state.options}
                    onChange={this.onChange}
                />
            </Form>
        );
    }
}

SearchBookForm.propTypes = {
    onBookSelect: PropTypes.func.isRequired
};
export default SearchBookForm;