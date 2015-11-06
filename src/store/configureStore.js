import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger({collapsed: true});

import {persistStore, autoRehydrate} from 'redux-persist'
const createPersistedStore = autoRehydrate()(createStore)

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createPersistedStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  persistStore(store)

  return store;
}
