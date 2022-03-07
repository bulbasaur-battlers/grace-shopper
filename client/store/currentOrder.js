import axios from 'axios';

const TOKEN = 'token';

const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

export const setCurrentOrder = (order) => {
  return {
    type: SET_CURRENT_ORDER,
    order,
  };
};

export const fetchOrder = () => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get('/api/orders/current', {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCurrentOrder(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const addToOrder = (productIdQuantity) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN);
      const addedProd = await axios.post(
        '/api/orders/current',
        productIdQuantity,
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN);
      await axios.put('/api/orders/current', orderDetails, {
        headers: {
          authorization: token,
        },
      });
      const { data: newOrder } = await axios.get('/api/orders/current', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCurrentOrder(newOrder));
    } catch (err) {
      console.error(err);
    }
  };
};
export const confirmOrder = (orderId) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN);
      await axios.put('/api/orders/current?confirmed=true', orderId, {
        headers: {
          authorization: token,
        },
      });
      const { data: newOrder } = await axios.get('/api/orders/current', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCurrentOrder(newOrder));
    } catch (err) {
      console.error(err);
    }
  };
};
export const deleteOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      // o: something should likely happen when token is not found
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete('/api/orders/current', {
        headers: {
          authorization: token,
        },
        data: orderDetails,
      });
      const { data: newOrder } = await axios.get('/api/orders/current', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCurrentOrder(newOrder));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function currentOrderReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.order;
    default:
      return state;
  }
}
