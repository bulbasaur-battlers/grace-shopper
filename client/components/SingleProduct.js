import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { addToOrder } from "../store/currentOrder";

function SingleProduct() {
  const [inputValue, setInputValue] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(params.productId));
  }, []);

  let product = useSelector((state) => state.singleProduct);
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addToOrder({ product, quantity: +inputValue }));
    setAddedMsg("Added to Cart!");
  }

  const randomRating = Math.floor(Math.random() * 300);

  if (product.length === 0) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="single-item">
        <div id="main-single-product-img">
          <img src={product.imageUrl} width="734" height="734" />
        </div>
        <div className="single-product-info">
          <div className="product-block">
            <div id="product-name-div">
              <h2>{product.name}</h2>
              {isAdmin && (
                <div id="edit-button">
                  <Link to={`/admin/edit/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              )}
            </div>
            <div className="rating">
              <img
                src="https://clipart.info/images/ccovers/1559839338multiple-star-png-5.png"
                width="180"
                height="70"
              />
              <span className="rating-num">5.0 ({randomRating})</span>
            </div>
            <p>$ {product.price}</p>
          </div>
          <div className="cart-add">
          <div>
            <hr />
          </div>
            <div className="quantity">
              <span>Qty: </span>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <select
                    name="quantity"
                    defaultValue={1}
                    onChange={(e) => setInputValue(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </form>
            </div>
            <button
              className="button-60"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Add To Cart
            </button>
            <div>
              <p>{addedMsg}</p>
            </div>
          </div>
          <div className="product-detail">
          <div>
            <hr />
            </div>
            <div></div>
          <h2>Product Detail</h2>
          <p id="descriptor">{product.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
