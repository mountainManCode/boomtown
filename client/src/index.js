import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./index.css";
import muiTheme from "./config/theme";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import Items from "./containers/Items";
import Profile from "./containers/Profile";
import NotFound from "./containers/NotFound";

const Boomtown = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <div>
        <Route exact path="/login" component={Login} />
        <Layout>
          <Switch>
            <Route exact path="/" component={Items} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/share" component={} /> */}

            {/* <Route path="*" component={NotFound} /> */}
          </Switch>
        </Layout>
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById("root"));
registerServiceWorker();
