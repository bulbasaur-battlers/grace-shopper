import axios from 'axios';

const TOKEN = 'token'

const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeProduct = (Pid) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        const { data } = await axios.delete(`/api/products/${Pid}`, {
          headers: {
            authorization: token
          }
        })
        dispatch(deleteProduct(data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id)
    default:
      return state;
  }
}
