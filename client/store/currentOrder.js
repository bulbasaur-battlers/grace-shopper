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

export default function currentOrderReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.order;
    default:
      return state;
  }
}
