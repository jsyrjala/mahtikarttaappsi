import { combineReducers } from 'redux';

import { simple } from './simple';
import { items } from './items';
import { map } from './map';

const rootReducer = combineReducers({
  simple,
  items,
  map,
});

export default rootReducer;
