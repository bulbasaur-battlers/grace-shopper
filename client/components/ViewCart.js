import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../store/currentOrder';
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
  let total = 0;

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);
  let cart = useSelector((state) => state.currentOrder);

  if (cart.products) {
    products = cart.products;
    products.forEach((currProd) => {
      total += currProd.pennies * currProd.orderproduct.quantity;
    });
  }

  if (products.length === 0) {
    return <h1>No Items In Cart</h1>;
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
                      <p>Quantity: {current.orderproduct.quantity}</p>
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
              <button className="button-60">Update Cart</button>
            </div>
            <div>
              <button className="button-60">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCart;
