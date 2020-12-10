import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Actions/cartActions';
import { headerBgOn } from '../Actions/headerActions';
import MessageBox from '../Components/MessageBox';

export default function CartScreen(props) {

    const productId = props.match.params.id
    const qty = props.location.search
    ? props.location.search.split('=')[1]
    : 1;
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect (() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
        dispatch(headerBgOn())
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push(`/signin?redirect=shipping`)
    }


    return (
        <div className='row center top' style={{padding: '1rem'}}>
            <div className='col-2'>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 
                    ? <MessageBox>
                         Cart is empty. <Link to='/'>Go Shopping</Link>   
                    </MessageBox>
                    : 
                    (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className='row'>
                                        <div>
                                            <img src={item.image} alt={item.name} className='small' />
                                        </div>
                                        <div className='min-30'>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            $ {item.price}
                                        </div>
                                        <div>
                                            <button type='button' onClick={() => removeFromCartHandler(item.product)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a,c) => a + 1 * c.qty, 0)} items) : ${cartItems.reduce((a,c) => a + c.price * c.qty, 0)} {/* se indica que el valor inicial de a es 0 */}
                            </h2>
                        </li>
                        <li>
                            <button type='button' onClick={checkoutHandler} className='primary block' disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
