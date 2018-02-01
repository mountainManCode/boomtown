import { combineReducers } from 'redux';
import itemsReducer from './modules/items';
import profileReducer from './modules/profile';
import filterReducer from './modules/filter';
import authReducer from './modules/auth';

export default combineReducers({
    items: itemsReducer,
    profile: profileReducer,
    filter: filterReducer,
    auth: authReducer,
});
