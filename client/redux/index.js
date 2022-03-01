import { combineReducers } from 'redux'
import productsReducer from './products'
import singleProductReducer from './singleProduct';

const appReducer = combineReducers({
  products: productsReducer,
  singleProduct: singleProductReducer
});

export default appReducer;
