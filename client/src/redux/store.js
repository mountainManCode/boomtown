import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

// dispatch action to update store to update filters
// item filter this.props
// Container
// maps ListeningStateChangedEvent
// Filter const
// items tags

// borrowed Profile:
