import React, { Component } from 'react';
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
            redirect: false,
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
                .then(args => {
                    console.log('succes', args);
                    this.props.history.push('/items');
                })
                .catch(error => {
                    // Handle Errors here.
                    console.log('Error', error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    };

    render() {
        return (
            <Login
                login={this.login}
                emailInputValue={this.state.emailInputValue}
                passwordInputValue={this.state.passwordInputValue}
                handleUpdateEmail={this.handleUpdateEmail}
                handleUpdatePassword={this.handleUpdatePassword}
            />
        );
    }
}

export default LoginContainer;
