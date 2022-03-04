import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeProduct } from '../store/singleProduct'


const ProductForm = () => {
    const dispatch = useDispatch
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
        makeProduct(product)
    }

    return (
        <div className="productForm">
            {error && error.response && <div> {error.response.data} </div>}
            <form id="formInputs" onSubmit={handleSubmit}>

                <label htmlFor="name">Product Name:</label>
                <input id="name" name="name" onChange={handleChange} />

                <label htmlFor="pennies">Product Price in Pennies:</label>
                <input id="pennies" name="pennies" onChange={handleChange} />

                <label htmlFor="imageUrl">Image Url:</label>
                <input id="imageUrl" name="imageUrl" onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <textarea name="description" rows="4" cols="20" onChange={handleChange} />

            </form>
            <button type="submit" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default ProductForm