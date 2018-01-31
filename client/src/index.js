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
import './index.css';
import muiTheme from './config/theme';
import Layout from './components/Layout';
import Login from './containers/Login';
// import HeaderBar from './components/HeaderBar/HeaderBar';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';
import NotFound from './containers/NotFound';

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                {/* <ConnectedRouter history={history}> */}
                <Router>
                    <div>
                        <Route exact path="/" component={Login} />
                        <Layout>
                            <Switch>
                                <Route exact path="/items" component={Items} />
                                <Route
                                    exact
                                    path="/profile/:userid"
                                    component={Profile}
                                />
                                <Route exact path="/share" component={Share} />

                                <Route path="*" component={NotFound} />
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
