import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT';

export const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product
  };
};

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

export default function singleProductReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
