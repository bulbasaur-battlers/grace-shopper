import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';
import productsReducer from './products';
import singleProductReducer from './singleProduct';
<<<<<<< HEAD
import currentOrderReducer from './currentOrder';
=======
import adminUsersReducer from './adminUsers';
>>>>>>> origin/main

const reducer = combineReducers({
  auth,
  products: productsReducer,
  singleProduct: singleProductReducer,
<<<<<<< HEAD
  currentOrder: currentOrderReducer,
=======
  adminUsers: adminUsersReducer
>>>>>>> origin/main
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
