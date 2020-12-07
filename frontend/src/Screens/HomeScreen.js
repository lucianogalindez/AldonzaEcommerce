import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../Actions/productActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';


export default function HomeScreen() {

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            {loading ? <LoadingBox />
            : error ? <MessageBox variant='danger'>{error}</MessageBox>
            : 
            (
                <div className='row center'>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )
            }  
        </div>
    )
}
