import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignUp from './SignUp';
import { firebaseAuth } from '../../config/firebase';

class SignUpContainer extends Component {
    static propTypes = {};

    state = {
        open: 'false',
        emailInputValue: '',
        passwordInputValue: '',
        signUpError: { message: '' },
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSignUpEmail = e => {
        this.setState({ emailInputValue: e.target.value });
    };

    handleSignUpPassword = e => {
        this.setState({ passwordInputValue: e.target.value });
    };

    handleSignUp = () => {
        if (this.state.emailInputValue && this.state.passwordInputValue) {
            firebaseAuth
                .createUserWithEmailAndPassword(
                    this.state.emailInputValue,
                    this.state.passwordInputValue,
                )
                .catch(error => {
                    const errorMessage = error.message;
                    this.setState({ signUpError: errorMessage });
                    console.log(errorMessage);
                });
        }
    };

    render() {
        return (
            <SignUp
                currentState={this.state}
                handleClose={this.handleClose}
                handleOpen={this.handleOpen}
                signUpEmail={this.handleSignUpEmail}
                signUpPassword={this.handleSignUpPassword}
                signUpConfirm={this.handleSignUp}
            />
        );
    }
}

export default SignUpContainer;
