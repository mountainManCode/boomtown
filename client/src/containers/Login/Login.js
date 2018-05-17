import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import ValidatedTextField from '../../components/ValidatedTextField';
import SignUpContainer from '../SignUp/SignUpContainer';
import About from '../../components/About/About';

import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';
import './styles.css';

const Login = ({
    login,
    handleEmail,
    handlePassword,
    emailInputValue,
    passwordInputValue,
    loginError,
}) => (
    <div className="page">
        <div className="logo">
            <img src={logo} alt="Boomtown Logo" />
        </div>
        <div className="topRight">
            <img src={topRight} alt="Sky" />
        </div>
        <div className="bottomLeft">
            <img src={bottomLeft} alt="City" />
        </div>
        <div className="cardContainer">
            <Paper zDepth={5}>
                <div className="formContainer">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            login();
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <ValidatedTextField
                                label="Email"
                                value={emailInputValue}
                                type="email"
                                handleChange={handleEmail}
                            />
                        </div>
                        <div>
                            <ValidatedTextField
                                label="Password"
                                value={passwordInputValue}
                                type="password"
                                handleChange={handlePassword}
                            />
                        </div>
                        <RaisedButton
                            className="enterButton"
                            primary
                            fullWidth
                            type="submit"
                        >
                            Enter
                        </RaisedButton>
                    </form>
                    <div>{loginError.message}</div>
                </div>
                <div className="dialogueContainer">
                    <About />
                    <SignUpContainer />
                </div>
            </Paper>
        </div>
    </div>
);

Login.propTypes = {
    login: PropTypes.func.isRequired,
};

export default Login;
