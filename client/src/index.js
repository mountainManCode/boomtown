import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import client from './config/apolloClient';
import { updateAuthState, userLoading } from './redux/modules/auth';
import { firebaseAuth } from './config/firebase';

import muiTheme from './config/theme';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout';
import Login from './containers/Login';
// import HeaderBar from './components/HeaderBar/HeaderBar';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';
import NotFound from './containers/NotFound';

import './index.css';

let gotProfile = false;
store.subscribe(() => {
    const values = store.getState();
    if (values.authenticated !== 'LOADING_USER' && !gotProfile) {
        gotProfile = true;
        store.dispatch(userLoading(false));
    }
});

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        store.dispatch(updateAuthState(user));
    } else {
        store.dispatch(updateAuthState(false));
    }
});

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                {/* <ConnectedRouter history={history}> */}
                <Router>
                    <div>
                        <Layout>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute
                                    exact
                                    path="/"
                                    component={Items}
                                />
                                <PrivateRoute
                                    exact
                                    path="/profile/:userid"
                                    component={Profile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/profile/:"
                                    component={Profile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/share"
                                    component={Share}
                                />

                                <PrivateRoute path="*" component={NotFound} />
                            </Switch>
                        </Layout>
                    </div>
                </Router>
                {/* </ConnectedRouter> */}
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
