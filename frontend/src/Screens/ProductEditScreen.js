import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { headerBgOn } from '../Actions/headerActions';
import { detailsProducts, updatedProduct } from '../Actions/productActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../Constants/productConstants';
import axios from '../axios';

export default function ProductEditScreen(props) {

    const productId = props.match.params.id;

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate 
    } = productUpdate

    useEffect (() => {
        if (successUpdate) {
            props.history.push('/productlist')
        }
        if (!product || product._id !== productId || successUpdate ) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch(detailsProducts(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
        dispatch(headerBgOn())
    }, [dispatch, product, productId, props.history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updatedProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }

    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData(); //necesario para ajax request que suban imagenes
        bodyFormData.append('image', file) //image es la key
        setLoadingUpload(true)

        try {
            await axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
                .then(response => {
                    console.log(response)
                    setImage(response.data)
                    setLoadingUpload(false)
                })
        } catch(error) {
            setErrorUpload(error.message);
            setLoadingUpload(false)
        }

    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div><h1>Edit Product {productId}</h1></div>
                {loadingUpdate && <LoadingBox />}
                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox />
                : error ? <MessageBox variant='danger'>{error}</MessageBox>
                : (
                <>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input 
                            id='name' 
                            type='text' 
                            placeholder='Enter name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='price'>Price</label>
                        <input 
                            id='price' 
                            type='text' 
                            placeholder='Enter price' 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='image'>Image</label>
                        <input 
                            id='image' 
                            type='text' 
                            placeholder='Enter image' 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='imageFile'>Image File</label>
                        <input 
                        type='file' 
                        id='imageFile'
                        label='Choose Image'
                        onChange={uploadFileHandler}
                        ></input>
                        {loadingUpload && <LoadingBox />}
                        {errorUpload && <MessageBox variant='danger'>{errorUpload}</MessageBox>}
                    </div>
                    <div>
                        <label htmlFor='category'>Category</label>
                        <input 
                            id='category' 
                            type='text' 
                            placeholder='Enter category' 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='countInStock'>Count in Stock</label>
                        <input 
                            id='countInStock' 
                            type='text' 
                            placeholder='Enter stock' 
                            value={countInStock} 
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='brand'>Brand</label>
                        <input 
                            id='brand' 
                            type='text' 
                            placeholder='Enter brand' 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea 
                            id='description' 
                            type='text' 
                            placeholder='Enter description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label></label>
                        <button type='submit' className='primary'>
                            Update
                        </button>
                    </div>
                </>
                )}
            </form>
        </div>
    )
}
