import React, { useEffect } from 'react'
import { createOrder } from '../Actions/orderActions'
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_CREATE_RESET } from '../Constants/orderConstants';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Link } from 'react-router-dom';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { headerBgOn } from '../Actions/headerActions';

export default function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart)

    if(!cart.paymentMethod) {
        props.history.push('/payment')
    }
        
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)) // 5.1234 => String '5.12' => Number 5.12

    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a,c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100
    ? toPrice(0)
    : toPrice(10); 
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const dispatch = useDispatch()

    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }

    useEffect(() => {
        if(success) {
            props.history.push(`/order/${cart.paymentMethod}/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET})
        }
        dispatch(headerBgOn())
    }, [success, dispatch, order, props.history, cart])
    

    return (
        <div style={{padding: '1rem'}}>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {cart.shippingAddress.fullName} <br/>
                                    <strong>Address: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong> {cart.paymentMethod} <br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                            {cart.cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className='row'>
                                        <div>
                                            <img src={item.image} alt={item.name} className='small' />
                                        </div>
                                        <div className='min-30'>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                
                                        <div>
                                            {item.qty} x $ {item.price} = $ {item.price * item.qty}
                                        </div>
                                    </div>
                                </li>
                                ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='primary block' disabled={cart.cartItems.length === 0}>
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox />}
                            {error && <MessageBox variant='danger'>{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
