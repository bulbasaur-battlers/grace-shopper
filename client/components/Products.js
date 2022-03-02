import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../redux/products'


function Product() {

    const products = [{ name: 'shirt', price: 2.30, imageUrl: 'https://clipartix.com/wp-content/uploads/2016/05/T-shirt-blank-shirt-clip-art-free-vector-in-open-office-drawing-svg.jpg', desription: 'this is a test' }, { name: 'shirt', price: 2.30, imageUrl: 'https://clipartix.com/wp-content/uploads/2016/05/T-shirt-blank-shirt-clip-art-free-vector-in-open-office-drawing-svg.jpg', desription: 'this is a test' }, { name: 'Shirt', price: 2.32, imageUrl: 'https://clipartix.com/wp-content/uploads/2016/05/T-shirt-blank-shirt-clip-art-free-vector-in-open-office-drawing-svg.jpg', desription: 'this is a test' }, { name: 'Shirt', price: 2.30, imageUrl: 'https://clipartix.com/wp-content/uploads/2016/05/T-shirt-blank-shirt-clip-art-free-vector-in-open-office-drawing-svg.jpg', desription: 'this is a test' }, { name: 'shirt', price: 2.30, imageUrl: 'https://clipartix.com/wp-content/uploads/2016/05/T-shirt-blank-shirt-clip-art-free-vector-in-open-office-drawing-svg.jpg', desription: 'this is a test' }]

    useEffect(() => { }, [])

    if (products.length === 0) {
        return (<h1>No Items To Sell!</h1>)
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
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default Product