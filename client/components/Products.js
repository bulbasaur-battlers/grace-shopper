import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { removeProduct } from '../store/products';
import { addToOrder } from '../store/currentOrder';

function Product() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToOrder({ product, quantity: 1 }))
  }

  let products = useSelector((state) => state.products);

  if (products.length === 0) {
    return <h1>No Items To Sell!</h1>;
  } else {
    return (
      <div>
        <div className="productPageTop">
          {isAdmin && (
            <Link to="/admin/addProduct">
              <button className="button-60">Add Item</button>
            </Link>
          )}
        </div>
        <div className="allProd">
          {products.map((current) => {
            return (
              <div className="singleProduct" key={current.id}>
                <div className="frontDisplay">
                  <Link to={`/products/${current.id}`}>
                    <img src={current.imageUrl} width="190" height="225" />
                  </Link>
                </div>
                <div>
                  <p>{current.name}</p>
                  <p>${current.price}</p>
                </div>
                <div className="productInfo">
                  {isAdmin && (
                    <button
                      className="del"
                      type="submit"
                      onClick={() => dispatch(removeProduct(current.id))}>
                      Delete Item
                    </button>
                  )}
                  <button className="button-60" onClick={() => addToCartHandler(current)}>Add To Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Product;
