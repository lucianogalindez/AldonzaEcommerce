import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { headerBg } from '../Actions/headerActions';
import { listProducts } from '../Actions/productActions';
import Banner from '../Components/Banner';
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

    useEffect(() => {
        if(!loading) {
            if (!error) {
                dispatch(headerBg())
            }
        }
    }, [dispatch, loading, error])

    return (
        <div>
            {loading ? <LoadingBox />
            : error ? <MessageBox variant='danger'>{error}</MessageBox>
            : 
            (
                <>
                <Banner />
                <div className='row center'>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
                </>
            )
            }  
        </div>
    )
}
