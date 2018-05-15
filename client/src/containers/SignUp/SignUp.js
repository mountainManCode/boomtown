import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ValidatedTextField from '../../components/ValidatedTextField';

// import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';

class SignUp extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {
            currentState,
            signUpEmail,
            signUpPassword,
            signUpConfirm,
        } = this.props;

        const actions = [
            <FlatButton label="Cancel" primary onClick={this.handleClose} />,
            <FlatButton
                label="Submit"
                type="submit"
                form="signUpForm"
                primary
            />,
        ];

        return (
            <div>
                <RaisedButton label="Sign Up" onClick={this.handleOpen} />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal
                    open={this.state.open}
                >
                    <div className="formContainer">
                        <form
                            id="signUpForm"
                            onSubmit={e => {
                                e.preventDefault();
                                signUpConfirm();
                                this.handleClose();
                            }}
                            autoComplete={false}
                        >
                            <div>
                                <ValidatedTextField
                                    label="Email"
                                    type="email"
                                    handleChange={signUpEmail}
                                />
                            </div>
                            <div>
                                <ValidatedTextField
                                    label="Password"
                                    type="password"
                                    handleChange={signUpPassword}
                                />
                            </div>
                        </form>
                        <div>{currentState.signUpError.message}</div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default SignUp;
