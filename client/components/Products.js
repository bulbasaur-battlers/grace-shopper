import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { removeProduct } from '../store/products';
import { addToOrder } from '../store/currentOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToOrder({ product, quantity: 1 }));
    toast(`Added ${product.name} to cart!`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  let products = useSelector((state) => state.products);

  if (products.length === 0) {
    return (
      <div className="status-box">
        <div className="status-message">
          <h1>Loading....</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
                  <button
                    className="button-60"
                    onClick={() => addToCartHandler(current)}>
                    Add To Cart
                  </button>
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
