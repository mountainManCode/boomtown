import React, { Component } from 'react';
import { firebaseAuth } from '../../config/firebase';
import MenuItem from 'material-ui/MenuItem';
// import Checkbox from "material-ui/Checkbox";

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterValue } from '../../redux/modules/filter';

import Logo from '../../images/boomtown-logo.svg';

// import SelectFilter from "../SelectFilter/SelectFilter";

// import Login from "../../containers/Login/Login";
// import Items from "../../containers/Items/Items";
// import ItemCard from "../ItemCard/ItemCard";

const logout = () => {
    firebaseAuth
        .signOut()
        .then(() => {
            // Sign-out successful.
        })
        .catch(error => {
            // An error happened.
        });
};
class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
        };
    }

    handleChange = (event, index, selected) => {
        this.props.dispatch(setFilterValue(selected));
    };

    render() {
        // console.log(this.props.filters);
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
                    {/* <Route exact path> use this to hide and show Selector Field */}
                    {/* <SelectField /> */}

                    <SelectField
                        className="headerFilter"
                        multiple
                        autoWidth
                        floatingLabelText="Filter by Tag"
                        onChange={this.handleChange}
                        value={this.props.selectedFilters}
                    >
                        {this.props.filters.map(tag => (
                            <MenuItem
                                insetChildren
                                key={tag.title}
                                checked={
                                    !!this.props.selectedFilters.find(
                                        f => f === tag.title,
                                    )
                                }
                                value={tag.title}
                                primaryText={tag.title}
                                // .includes .some
                            />
                        ))}
                    </SelectField>
                    {/* </Route> */}
                </ToolbarGroup>
                <ToolbarGroup className="headerButtonWrapper">
                    <Link to="/profile">
                        <RaisedButton label="My Profile" primary />
                    </Link>
                    <ToolbarSeparator />
                    <Link to="/login">
                        <RaisedButton
                            logout={this.logout}
                            label="Logout"
                            secondary
                        />
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = state => ({
    selectedFilters: state.filter.selectedFilters,
    filters: state.filter.filters,
});

export default connect(mapStateToProps)(HeaderBar);
