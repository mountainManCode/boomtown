import React from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Login from "../../containers/Login/Login";
import Items from "../../containers/Items/Items";
import ItemCard from "../ItemCard/ItemCard";
import Logo from "../../images/boomtown-logo.svg";

export default class ToolbarExamplesSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <Toolbar className="header__toolbar">
        <ToolbarGroup firstChild={true}>
          <Link to="/">
            <img src={Logo} className="header__logo-image" />
          </Link>
          <SelectField
            className="header__filter-item"
            floatingLabelText="Filter by tag"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="Electronics" />
            <MenuItem value={2} primaryText="Household Items" />
            <MenuItem value={3} primaryText="" />
            <MenuItem value={4} primaryText="Musical Instruments" />
            <MenuItem value={4} primaryText="Physical Media" />
            <MenuItem value={5} primaryText="Recreational Equipment" />
          </SelectField>
        </ToolbarGroup>
        <ToolbarGroup>
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

// import React, { Component } from "react";

// export default class HeaderBar extends Component {
//   render() {
//     return (
//       <div>
//         <button>
//           <Link to="/">Home</Link>
//         </button>
//         {/* <button onClick={() => history.push('/')>My Profile</button> */}
//         <button>
//           <Link to="/login">Login</Link>
//         </button>
//       </div>
//     );
//   }
// }
