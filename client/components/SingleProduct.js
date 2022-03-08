import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { addToOrder } from '../store/currentOrder';

function SingleProduct() {
  const [inputValue, setInputValue] = useState(1);
  const [addedMsg, setAddedMsg] = useState('');
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
    setAddedMsg('Added to Cart!');
  }
  if (product.length === 0) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="singleItem">
        <img src={product.imageUrl} width="390" height="425" />
        <div className="singleProductInfo">
          <h2>{product.name}</h2>
          {isAdmin && (
            <Link to={`/admin/edit/${product.id}`}>
              <button>Edit</button>
            </Link>
          )}
          <p>${product.price}</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <select
              name="quantity"
              defaultValue={1}
              onChange={(e) => setInputValue(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input className="button-60" type="submit" value="Add To Cart" />
          </form>
          <div>
            <p>{addedMsg}</p>
          </div>
          <p id="descriptor">{product.description}</p>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
