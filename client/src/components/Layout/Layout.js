import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../HeaderBar/HeaderBar';
import Footer from '../Footer/Footer';

import './styles.css';

const Layout = ({ children, userLoading, authenticated }) =>
    (userLoading ? (
        <div>Loading ...</div>
    ) : (
        // loader of appp render in here
        <div className="appContentWrapper">
            <div className="appHeader">{authenticated && <HeaderBar />}</div>
            <div className="appContent">{children}</div>
            <div className="appFooter">{authenticated && <Footer />}</div>
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

export default withRouter(connect(mapStateToProps)(Layout));
