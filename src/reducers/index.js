import { combineReducers } from 'redux';

import { simple } from './simple';
import { items } from './items';
import { map } from './map';
import { auth } from './auth'

import { isFSA } from 'flux-standard-action';

function actionChecker(reducer) {
  return function (state, action) {
    // if key is set it is rehydration event
    if (!action.key && !isFSA(action)) {
      console.warn('Action is not a flux standard action compatible ' + JSON.stringify(action))
    }
    return reducer(state, action)
  }
}

const rootReducer = combineReducers({
  simple,
  items,
  map,
  auth,
});


export default actionChecker(rootReducer);
