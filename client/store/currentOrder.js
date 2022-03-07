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
      } else {
        const cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
          let cart = {
            products: []
          }
          localStorage.setItem("cart", JSON.stringify(cart))
        }
        dispatch(setCurrentOrder(cart))
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const addToOrder = (productIdQuantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const addedProd = await axios.post(
          '/api/orders/current',
          productIdQuantity,
          {
            headers: {
              authorization: token,
            },
          }
        );
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (cart) {

          let x = true;
          cart.products.forEach(element => {
            if (element.id === productIdQuantity.product.id) {
              element.orderproduct.quantity += productIdQuantity.quantity
              x = false
            }
          });

          if (x) {
            cart.products.push({
              ...productIdQuantity.product,
              orderproduct: { quantity: productIdQuantity.quantity }
            })
          }

          localStorage.setItem("cart", JSON.stringify(cart))
        } else {
          cart = {
            products: [{
              ...productIdQuantity.product,
              orderproduct: { quantity: productIdQuantity.quantity }
            }]
          }
          localStorage.setItem("cart", JSON.stringify(cart))
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
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
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"))

        cart.products.forEach(element => {
          if (orderDetails.updated[element.id]) {
            element.orderproduct.quantity = orderDetails.updated[element.id]
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch(setCurrentOrder(cart));
      }
    } catch (err) {
      console.error(err);
    }
  };
};
export const confirmOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
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
      } else {
        localStorage.removeItem("cart")
        let cart = {
          products: []
        }
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    } catch (err) {
      console.error(err);
    }
  };
};
export const deleteOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
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
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"))
        const arr = cart.products.filter(current => {
          if (current.id != orderDetails.productId) {
            return current
          }
        })
        cart = {
          ...cart,
          products: arr
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch(setCurrentOrder(cart))
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
