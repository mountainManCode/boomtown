import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../HeaderBar/HeaderBar';

import './styles.css';

const Layout = ({ children, userLoading, authenticated }) =>
    (userLoading ? (
        <div>Loading ...</div>
    ) : (
        // loader of appp render in here
        <div className="appContentWrapper">
            <div className="appHeader">{authenticated && <HeaderBar />}</div>
            <div className="appContent">{children}</div>
            {/* And a footer here, but not on the login route... */}
        </div>
    ));

Layout.defaultProps = {
    children: null,
};

Layout.propTypes = {
    children: PropTypes.node,
};

const mapStateToProps = state => ({
    userLoading: state.auth.userLoading,
    authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Layout);

// export default connect(({ authenticated, userLoading }) => ({
//     authenticated,
//     userLoading,
// }))(Layout);
