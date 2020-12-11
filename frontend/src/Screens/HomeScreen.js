import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { headerBg, headerBgOn } from '../Actions/headerActions';
import { listProducts } from '../Actions/productActions';
import Banner from '../Components/Banner';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';


export default function HomeScreen() {

    const [header, setHeader] = useState(false)
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
        
    }, [dispatch])

    useEffect(() => {
        if(!loading) {
            if (!error) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 200) {
                        setHeader(true)
                    } else {
                        setHeader(false)
                    }
                })
            }
        }   
    }, [dispatch, loading, error])

    useEffect(() => {
        if (header) {
            dispatch(headerBgOn())
        } else {
            dispatch(headerBg())
        }
    }, [header, dispatch])

    return (
        <div>
            {loading ? <><br/><LoadingBox/></> 
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
