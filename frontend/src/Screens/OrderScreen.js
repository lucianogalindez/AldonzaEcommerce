import {PayPalButton} from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder } from '../Actions/orderActions';
import LoadingBox from "../Components/LoadingBox";
import MessageBox from '../Components/MessageBox'
import { ORDER_PAY_RESET } from '../Constants/orderConstants';
import axios from '../axios'

export default function OrderScreen(props) {
    
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false)
    const [data, setData] = useState('')

    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, error: errorPay, success: successPay} = orderPay

    useEffect(() => {
        const addPaypalScript = async () => {
            await axios.get('/api/config/paypal')
                .then(response => {
                    setData(response.data)
                })
            console.log(data)
            const script = document.createElement('script');
            script.type='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
            script.async=true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script); //lo llama al final del html
        }

        if(!order || successPay || (order && order._id !== orderId)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
        } else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPaypalScript();
                } else {
                    setSdkReady(true) 
                }
            }
        }

    }, [dispatch, orderId, order, sdkReady, data, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }
    
    return loading 
    ? (<LoadingBox/>)
    : error 
    ? (<MessageBox variant='danger'>{error}</MessageBox>)
    : (
        <div>
            <div>Order {order._id}</div>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered 
                                ? <MessageBox variant='success'>
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                                : <MessageBox variant='danger'>
                                    Not Delivered
                                </MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong> {order.paymentMethod} <br/>
                                </p>
                                {order.isPaid 
                                ? <MessageBox variant='success'>
                                    Paid at {order.paidAt}
                                </MessageBox>
                                : <MessageBox variant='danger'>
                                    Not Paid
                                </MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                            {order.orderItems.map((item) => (
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
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady
                                        ? (<LoadingBox>
                                        </LoadingBox>)
                                        : (
                                        <> 
                                        {errorPay && (
                                            <MessageBox variant='danger'>
                                                {errorPay}
                                            </MessageBox>
                                        )}
                                        {loadingPay && (
                                            <LoadingBox/>
                                        )}
                                        {/*<PayPalButton 
                                            amount={order.totalPrice} onSuccess={successPaymentHandler }>
                                        </PayPalButton>*/}
                                        </>
                                        )}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
