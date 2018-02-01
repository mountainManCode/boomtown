import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (authenticated) {
                return <Component {...props} />;
            }
            return <Redirect to="/login" />;
        }}
    />
);

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
