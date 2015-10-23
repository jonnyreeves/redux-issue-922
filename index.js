import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducer from './src/reducer'
import delayMiddleware from './src/middleware/delay';
import createAuthMiddleware from './src/middleware/auth';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createAuthMiddleware(),
  delayMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;
