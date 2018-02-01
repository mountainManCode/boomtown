import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './Login';
import { firebaseAuth } from '../../config/firebase';

class LoginContainer extends Component {
    static propTypes = {};

    constructor() {
        super();

        this.state = {
            emailInputValue: '',
            passwordInputValue: '',
            loginError: { message: '' },
        };
    }

    handleUpdateEmail = e => {
        this.setState({ emailInputValue: e.target.value });
    };
    handleUpdatePassword = e => {
        this.setState({ passwordInputValue: e.target.value });
    };

    login = () => {
        // console.log('You clicked the login button.');
        if (this.state.emailInputValue && this.state.passwordInputValue) {
            firebaseAuth
                .signInWithEmailAndPassword(
                    this.state.emailInputValue,
                    this.state.passwordInputValue,
                )
                .catch(error => {
                    this.setState({ loginError: error });
                });
        }
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: '/' },
        };
        return !this.props.authenticated ? (
            <Login
                login={this.login}
                emailInputValue={this.state.emailInputValue}
                passwordInputValue={this.state.passwordInputValue}
                handleUpdateEmail={this.handleUpdateEmail}
                handleUpdatePassword={this.handleUpdatePassword}
                loginError={this.state.loginError}
            />
        ) : (
            <Redirect to={from} />
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    userLoading: state.auth.userLoading,
});

export default connect(mapStateToProps)(LoginContainer);

// export default LoginContainer;
