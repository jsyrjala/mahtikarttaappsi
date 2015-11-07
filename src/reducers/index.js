import { combineReducers } from 'redux';

import { simple } from './simple';
import { items } from './items';
import { map } from './map';
import { auth } from './auth'

const rootReducer = combineReducers({
  simple,
  items,
  map,
  auth,
});

export default rootReducer;
