import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchSingleProduct } from '../store/singleProduct'


function SingleProduct() {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchSingleProduct(params.productId)) }, [])
    const isAdmin = useSelector((state) => state.auth.isAdmin)

    let product = useSelector(state => state.singleProduct)
    const params = useParams()

    if (product.length === 0) {
        return <h1>Loading</h1>
    } else {
        return (
            <div className="singleItem">
                <img src={product.imageUrl} width="390" height="425" />
                <div className="singleProductInfo">
                    <h2>{product.name}</h2>
                    {isAdmin &&
                        <Link to={`/admin/edit/${product.id}`}>
                            <button>Edit</button>
                        </Link>
                    }
                    <p>${product.price}</p>
                    <button id="SPbutton" className='button-60'>Add To Cart</button>
                    <p id='descriptor'>{product.description}</p>
                </div >
            </div >
        )
    }
}

export default SingleProduct