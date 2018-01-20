import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";

import SelectFilter from "../SelectFilter/SelectFilter";

// import Login from "../../containers/Login/Login";
// import Items from "../../containers/Items/Items";
// import ItemCard from "../ItemCard/ItemCard";
import Logo from "../../images/boomtown-logo.svg";

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <Toolbar className="headerToolbar">
        <ToolbarGroup firstChild={true} className="headerTitleWrapper">
          <Link to="/">
            <img src={Logo} className="headerLogo" alt="Boomtown logo" />
          </Link>
          {/* <Route exact path> use this to hide and show Selector Field */}
          <SelectField
            handleChange={(event, index, values) => {
              dispatch(getItemsFilters(values));
            }}
            values={itemsFilters}
          />
          {/* </Route> */}
        </ToolbarGroup>
        <ToolbarGroup className="headerButtonWrapper">
          <Link to="/profile">
            <RaisedButton label="My Profile" primary={true} />
          </Link>
          <ToolbarSeparator />
          <Link to="/login">
            <RaisedButton label="Login" secondary={true} />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
