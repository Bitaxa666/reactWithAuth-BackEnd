/**
 * Created by user on 4/23/18.
 */
import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/*import gravatarUrl from 'gravatar-url';*/
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import { allBooksSelector } from '../../reducers/books';

/* eslint-disable */
const TopNavigation = ({ user, logout, hasBooks }) => (
    <Menu secondary pointing>
        <Menu.Item as = { Link } to = "/dashboard">Dashboard</Menu.Item>

        {hasBooks && <Menu.Item as = { Link } to = "/books/new">Add New Book</Menu.Item>}

        <Menu.Menu position="right">
            {/*<Dropdown trigger = {<Image avatar src={gravatarUrl(user.email)} />}>*/}
            <Dropdown trigger = {<Image avatar src="https://experience.sap.com/fiori-design-web/wp-content/uploads/sites/5/2017/02/Avatar-Sizes-Custom-1.png" />}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={ () => logout() }>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    hasBooks: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        hasBooks: allBooksSelector(state).length > 0
    }

}

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);