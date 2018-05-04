/**
 * Created by user on 4/20/18.
 */
/**
 * Created by user on 4/20/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />} />
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

/*ЗАчем нужен маптупропс??*/
function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(GuestRoute);