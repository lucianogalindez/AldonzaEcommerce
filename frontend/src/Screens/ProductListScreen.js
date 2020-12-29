import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerBgOn } from '../Actions/headerActions';
import { createProduct, listProducts } from '../Actions/productActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../Constants/productConstants';

export default function ProductListScreen(props) {

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;

    const dispatch = useDispatch()

    const productCreate = useSelector (state => state.productCreate)
    const { 
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product: createdProduct
    } = productCreate

    useEffect(() => {
        if (successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        dispatch(listProducts())
        dispatch(headerBgOn())
    }, [dispatch, createdProduct, props.history, successCreate])

    const deleteHandler = () => {
        
    }

    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div style={{padding: '1rem'}}>
            <div className='row'>
                <h1>Products</h1>
                <button type='button' className='primary' onClick={createHandler}>Create Product</button>
            </div>
            {loadingCreate && <LoadingBox/>}
            {errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
            {loading ? <LoadingBox/>
            : error ? <MessageBox variant='danger'>{error}</MessageBox>
            : 
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button type='button' className='small' onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                    Edit
                                </button>
                                <button type='button' className='small' onClick={() => deleteHandler(product)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}    
                </tbody> 
            </table>
            }    
        </div>
    )
}
