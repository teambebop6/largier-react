/**
 * Created by Henry Huang.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import adminReducers from './admin/reducers';

const reducers = Object.assign({ routing: routerReducer }, adminReducers);

export default combineReducers(reducers);
