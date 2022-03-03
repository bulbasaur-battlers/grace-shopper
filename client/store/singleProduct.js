import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
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
      const { data } = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function singleProductReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    case DELETE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
