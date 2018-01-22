import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setFilterValue } from "../../redux/modules/filter";

import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";

import Logo from "../../images/boomtown-logo.svg";

// import SelectFilter from "../SelectFilter/SelectFilter";

// import Login from "../../containers/Login/Login";
// import Items from "../../containers/Items/Items";
// import ItemCard from "../ItemCard/ItemCard";

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleChange = (event, index, value) => {
    this.props.dispatch(setFilterValue(value));
  };

  render() {
    return (
      <Toolbar className="headerToolbar">
        <ToolbarGroup firstChild={true} className="headerTitleWrapper">
          <Link to="/">
            <img src={Logo} className="headerLogo" alt="Boomtown logo" />
          </Link>
          {/* <Route exact path> use this to hide and show Selector Field */}
          {/* <SelectField /> */}
          <SelectField
            className="headerFilter"
            floatingLabelText="Filter by Tag"
            value={this.props.filterValue}
            onChange={this.handleChange}
          >
            <MenuItem
              checked={this.props.filterValue === "Electronics"}
              value={"Electronics"}
              primaryText="Electronics"
            />
            <MenuItem value={"Household Items"} primaryText="Household Items" />
            <MenuItem
              value={"Musical Instruments"}
              primaryText="Musical Instruments"
            />
            <MenuItem value={"Physical Media"} primaryText="Physical Media" />
            <MenuItem
              value={"Recreational Equipment"}
              primaryText="Recreational Equipment"
            />
            <MenuItem value={"Tools"} primaryText="Tools" />
            <MenuItem value={7} primaryText="Recreational Equipment" />
          </SelectField>
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

const mapStateToProps = state => {
  console.log(state);
  return {
    filterValue: state.filter.filterValue
  };
};

export default connect(mapStateToProps)(HeaderBar);

{
  /* handleChange={(event, index, values) => {
              dispatch(getItemsFilters(values));
            }} */
}
{
  /* values={itemsFilters} */
}
