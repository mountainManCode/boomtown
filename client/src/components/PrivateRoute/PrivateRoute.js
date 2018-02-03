import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (authenticated) {
                return <Component {...props} />;
            }
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            );
        }}
    />
);

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
