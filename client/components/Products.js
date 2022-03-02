import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';

function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let products = useSelector((state) => state.products);

  if (products.length === 0) {
    return <h1>No Items To Sell!</h1>;
  } else {
    return (
      <div>
        <h3>Here are the Items</h3>
        <div className="allProd">
          {products.map((current, idx) => {
            return (
              <div className="singleProduct" key={idx}>
                <img src={current.imageUrl} width="190" height="225" />
                <div className="productInfo">
                  <div>
                    <p>{current.name}</p>
                    <p>${current.price.toFixed(2)}</p>
                  </div>
                  <button>Add To Cart</button>
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
