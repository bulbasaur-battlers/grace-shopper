import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeProduct } from '../store/singleProduct'


const ProductForm = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    const [product, setProduct] = useState({})
    const { error } = useSelector(state => state.singleProduct)

    const handleChange = (event) => {
        let value = {}
        value = { [event.target.name]: event.target.value }
        setProduct(product => ({
            ...product,
            ...value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(makeProduct(product))
        if (product.name !== undefined && product.pennies !== undefined) {
            history.push('/')
        }
    }


    return (
        <div className="productForm">
            {error && error.response && <div> {error.response.data} </div>}
            <form className="formInputs" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <input id="name" name="name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="pennies">Product Price in Pennies:</label>
                    <input id="pennies" name="pennies" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image Url:</label>
                    <input id="imageUrl" name="imageUrl" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows="4" cols="20" onChange={handleChange} />
                </div>

            </form>
            <button type="submit" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default ProductForm