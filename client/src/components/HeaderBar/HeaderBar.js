import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

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
          <SelectField
            className="headerFilter"
            floatingLabelText="Filter by Tag"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="Electronics" />
            <MenuItem value={2} primaryText="Household Items" />
            <MenuItem value={3} primaryText="Musical Instruments" />
            <MenuItem value={4} primaryText="Physical Media" />
            <MenuItem value={5} primaryText="Recreational Equipment" />
            <MenuItem value={6} primaryText="Recreational Equipment" />
            <MenuItem value={7} primaryText="Recreational Equipment" />
          </SelectField>
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
