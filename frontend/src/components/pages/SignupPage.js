/**
 * Created by user on 4/20/18.
 */
/**
 * Created by user on 4/20/18.
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users'

/* eslint-disable */
class SignupPage extends React.Component {

    submit = data => this.props.signup(data).then(() => this.props.history.push('/dashboard'));

    render() {
        return (
            <div style={{textAlign: "center", marginTop: "10%"}}>
                <h1>SignUp Page</h1>
                <SignupForm submit = {this.submit} />
            </div>
        );
    }
};

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);