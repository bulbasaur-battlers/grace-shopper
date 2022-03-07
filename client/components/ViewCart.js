import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOrder,
  confirmOrder,
  updateOrder,
  deleteOrder,
} from '../store/currentOrder';
import { Link } from 'react-router-dom';

// o: you went with pennies! :) ... so what's this logic below about?
const convertPennies = (pennies) => {
  if (Math.floor(pennies / 100) === 0) {
    return pennies % 100 < 10 ? `00.0${pennies % 100}` : `00.${pennies % 100}`;
  } else {
    if (pennies % 100 === 0) {
      return `${Math.floor(pennies / 100)}.00`;
    } else if (pennies % 100 < 10) {
      return `${Math.floor(pennies / 100)}.0${pennies % 100}`;
    } else {
      return `${Math.floor(pennies / 100)}.${pennies % 100}`;
    }
  }
};
function ViewCart() {
  const dispatch = useDispatch();
  let products = [];
  let initialQuantities = {};
  let total = 0;
  const [quantities, setQuantities] = useState({});

  let cart = useSelector((state) => state.currentOrder);

  const [myCart, setMyCart] = useState({});
  const [myProducts, setMyProducts] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [myCart, myProducts]);

  if (cart.products) {
    products = cart.products;
    products.forEach((currProd) => {
      total += currProd.pennies * currProd.orderproduct.quantity;
      initialQuantities[currProd.id] = currProd.orderproduct.quantitiy;
    });
  }
  if (quantities.length === 0) {
    setQuantities({ initialQuantities });
  }
  function handleDelete(orderid, productid) {
    dispatch(
      deleteOrder({
        orderId: orderid,
        productId: productid,
      })
    );
    setMyCart({ ...cart });
  }
  function handleUpdate(quantities, orderid) {
    dispatch(updateOrder({ updated: quantities, orderId: orderid }));
    setMyProducts([...cart.products]);
  }

  function handleCheckout(orderid) {
    dispatch(confirmOrder({ orderId: orderid }));
    setSubmitStatus(true);
  }
  if (products.length === 0 && !submitStatus) {
    return <h1>No Items In Cart</h1>;
  } else if (submitStatus) {
    return <h1>Successfully checked out!</h1>;
  } else {
    return (
      <div>
        <h3 className="cart-title">Products in your cart</h3>
        <div className="cart-container">
          <div className="cart-items-container">
            {products.map((current) => {
              return (
                <div className="cart-item" key={current.id}>
                  <div className="cart-item-image">
                    <Link to={`/products/${current.id}`}>
                      <img src={current.imageUrl} width="190" height="225" />
                    </Link>
                  </div>
                  <div className="cart-item-info">
                    <p>{current.name}</p>
                    <p>{current.price}</p>
                  </div>
                  <div className="cart-item-update">
                    <div>
                      <p>
                        Total:{' '}
                        {convertPennies(
                          current.pennies * current.orderproduct.quantity
                        )}
                      </p>
                    </div>
                    <div>
                      {/* <p>Quantity: {current.orderproduct.quantity}</p> */}
                      <form>
                        <input
                          type="number"
                          min="1"
                          placeholder={current.orderproduct.quantity}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [current.id]: e.target.value,
                            })
                          }
                          value={
                            quantities[current.id] ||
                            current.orderproduct.quantity
                          }
                        />
                      </form>
                    </div>
                    <div>
                      <button
                        className="button-60"
                        onClick={() => handleDelete(cart.id, current.id)}>
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total-submit">
            <div>
              <p>Cart Total: {convertPennies(total)}</p>
            </div>
            <div>
              <button
                className="button-60"
                onClick={() => handleUpdate(quantities, cart.id)}>
                Update Cart
              </button>
              <button
                className="button-60"
                onClick={() => handleCheckout(cart.id)}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCart;
