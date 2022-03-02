import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom'

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
                    {products.map((current) => {
                        return (
                            <div className="singleProduct" key={current.id}>
                                <Link to={`/products/${current.id}`}>
                                    <img src={current.imageUrl} width="190" height="225" />
                                </Link>
                                <div className="productInfo">
                                    <div>
                                        <p>{current.name}</p>
                                        <p>${current.price}</p>
                                    </div>
                                    <button className="button-60">Add To Cart</button>
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
