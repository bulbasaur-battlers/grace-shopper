import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOrder,
  confirmOrder,
  updateOrder,
  deleteOrder,
} from '../store/currentOrder';
import { Link } from 'react-router-dom';
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

  if (cart.products != undefined) {
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
      <div className="cartPage">
        <h3 className="cart-title">Products in your cart</h3>
        <div className="cart-item-total-submit"></div>
        <div className="cart-container">
          <div className="cart-items-container">
            <div className="cart-item-labels">
              <div className="dummy-image">
                <a href="https://archives.bulbagarden.net/media/upload/thumb/2/21/001Bulbasaur.png/600px-001Bulbasaur.png">
                  Bulbasaur-Battlers
                </a>
              </div>
              <div className="cart-item-names">
                <p className="invisible">Bulbasaur Bulba</p>
              </div>
              <div className="cart-item-prices">
                <p>Price</p>
              </div>
              <div className="cart-item-updates">
                <p>Quantity</p>
              </div>
              <div className="cart-item-totals">
                <p>Total</p>
              </div>
            </div>
            {products.map((current) => {
              return (
                <div className="cart-item" key={current.id}>
                  <div className="cart-item-image">
                    <Link to={`/products/${current.id}`}>
                      <img src={current.imageUrl} width="190" height="225" />
                    </Link>
                  </div>
                  <div className="cart-item-name">
                    <p>{current.name}</p>
                  </div>
                  <div className="cart-item-price">
                    <p>{current.price}</p>
                  </div>
                  <div className="cart-item-update">
                    <div>
                      <form>
                        <input
                          type="text"
                          placeholder={current.orderproduct.quantity}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [current.id]: e.target.value,
                            })
                          }
                          value={quantities[current.id] || ''}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <div className="text-right">
                      <p>
                        {convertPennies(
                          current.pennies * current.orderproduct.quantity
                        )}
                      </p>
                    </div>
                    <button
                      className="button-60"
                      onClick={() => handleDelete(cart.id, current.id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total-submit">
            <div>
              <p>Subtotal</p>
              <p>({convertPennies(total)})</p>
            </div>
            <div>
              <button
                className="button-60 cart-button"
                onClick={() => handleUpdate(quantities, cart.id)}>
                Update Cart
              </button>
              <button
                className="button-60 cart-button"
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
