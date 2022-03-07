import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeProduct } from '../store/singleProduct'
import { fetchSingleProduct } from '../store/singleProduct'
import { useParams, useHistory } from 'react-router-dom'


const EditProduct = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => { dispatch(fetchSingleProduct(params.productId)) }, [])
    const { error } = useSelector(state => state.singleProduct)
    let product = useSelector(state => state.singleProduct)
    const [eProduct, seteProduct] = useState({ ...product })

    console.log(eProduct)

    const handleChange = (event) => {
        let value = {}
        value = { [event.target.name]: event.target.value }
        seteProduct(product => ({
            ...product,
            ...value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(changeProduct(eProduct))
        if (eProduct.name !== '' && eProduct.pennies !== '') {
            history.push(`/products/${params.productId}`)
        }
    }

    return (
        <div className="productForm">
            {error && error.response && <div> {error.response.data} </div>}
            <form id="formInputs" onSubmit={handleSubmit}>

                <label htmlFor="name">Product Name:</label>
                <input id="name" name="name" value={eProduct.name} onChange={handleChange} />

                <label htmlFor="pennies">Product Price in Pennies:</label>
                <input id="pennies" name="pennies" value={eProduct.pennies} onChange={handleChange} />

                <label htmlFor="imageUrl">Image Url:</label>
                <input id="imageUrl" name="imageUrl" value={eProduct.imageUrl} onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <textarea name="description" value={eProduct.description} rows="4" cols="20" onChange={handleChange} />

            </form>
            <button type="submit" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default EditProduct