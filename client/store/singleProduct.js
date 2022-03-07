import axios from 'axios';

const TOKEN = 'token'

const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT'

export const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(getProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeProduct = (product) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        //If anythings broken its here
        const { data } = await axios.put(`/api/products/${product.id}`, product, {
          headers: {
            authorization: token
          }
        })
        dispatch(updateProduct(data))
      }
    } catch (err) {
      return dispatch(getProduct({ error: err }))
    }
  }
}

export const makeProduct = (product) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        const { data } = await axios.post('/api/products/', product, {
          headers: {
            authorization: token
          }
        })
        dispatch(addProduct(data))
      }
    } catch (err) {
      return dispatch(getProduct({ error: err }))
    }
  }
}



export default function singleProductReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case ADD_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
