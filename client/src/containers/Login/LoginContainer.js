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
                .then(args => {
                    this.props.history.push('/');
                })
                .catch(error => {
                    this.setState({ loginError: error });
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
                loginError={this.state.loginError}
            />
        );
    }
}

// const mapStateToProps = state => ({
//     authenticated: state.auth.authenticated,
//     userLoading: state.userLoading,
// });

// export default connect()(LoginContainer);

export default LoginContainer;
