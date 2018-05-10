import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
// import Checkbox from "material-ui/Checkbox";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';

import { firebaseAuth } from '../../config/firebase';
import { setFilterValue } from '../../redux/modules/filter';

import Logo from '../../images/boomtown-logo.svg';
import TagSelectFilter from '../TagSelectFilter';

class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
        };
    }

    render() {
        const userProfile = firebaseAuth.currentUser.uid;

        return (
            <Toolbar className="headerToolbar">
                <ToolbarGroup firstChild className="headerTitleWrapper">
                    <Link to="/">
                        <img
                            src={Logo}
                            className="headerLogo"
                            alt="Boomtown logo"
                        />
                    </Link>
                    <Route exact path="/" component={TagSelectFilter} />
                </ToolbarGroup>
                <ToolbarGroup className="headerButtonWrapper">
                    <Link to={`/profile/${userProfile}`}>
                        <RaisedButton label="My Profile" primary />
                    </Link>
                    <ToolbarSeparator />
                    <Link to="/">
                        <RaisedButton
                            label="Logout"
                            onClick={() => {
                                firebaseAuth.signOut().catch(error => {});
                            }}
                            secondary
                        />
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = state => ({
    tagsSelected: state.filter.tagsSelected,
    tagsList: state.filter.tagsList,
});

export default connect(mapStateToProps)(HeaderBar);
