import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder, pendingOrder } from '../Actions/orderActions';
import LoadingBox from "../Components/LoadingBox";
import MessageBox from '../Components/MessageBox'
import { ORDER_PAY_RESET } from '../Constants/orderConstants';
import axios from '../axios'
import { headerBgOn } from '../Actions/headerActions';

export default function OrderScreenMP(props) {

    
    const orderId = props.match.params.id;
    const status = props.match.params.status;

    const [data, setData] = useState('')

    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    /*Si la orden se ha pagado*/
    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, error: errorPay, success: successPay} = orderPay

    /*Si la orden se encuentra con pago pendiente*/
    const orderPayPending = useSelector(state => state.orderPayPending)
    const {loading: loadingPayPending, error: errorPayPending, success: successPayPending} = orderPayPending

    const addMercadoPagoScript = async () => {
        await axios.post('/api/mercadopago', {name: 'Productos Aldonza', price: order.totalPrice, qty: 1, orderId: orderId})
            .then(response => {
                setData(response.data)
            })
        /*const script = document.createElement('script');
        script.src='https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
        script.async=true
        script.setAttribute('data-preference-id', data)
        window.open(document.getElementById('mp').appendChild(script)); //lo llama al final del html*/
    }

    useEffect(() => {
        

        if(!order || (order && order._id !== orderId)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
        } else {
            addMercadoPagoScript()
        }

        dispatch(headerBgOn())

    }, [dispatch, order, orderId])

    useEffect(() => {
        if (status === 'pending') {
            dispatch(pendingOrder(orderId))
            setTimeout(() => {
                dispatch(detailsOrder(orderId))
            }, 200);
        }

        console.log(status)

    }, [dispatch, status, orderId])

    
    return loading 
    ? (<LoadingBox/>)
    : error 
    ? (<MessageBox variant='danger'>{error}</MessageBox>)
    : (
        <div style={{padding: '1rem'}}>
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
                                : order.isPaidPending
                                ? <MessageBox variant='success'>
                                    Payment in process
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
                                !order.isPaidPending && (
                                    <li>
                                        <>
                                        {errorPay && (
                                            <MessageBox variant='danger'>
                                                {errorPay}
                                            </MessageBox>
                                        )}
                                        {errorPayPending && (
                                            <MessageBox variant='danger'>
                                                {errorPay}
                                            </MessageBox>
                                        )}
                                        {loadingPay && (
                                            <LoadingBox/>
                                        )}
                                        {loadingPayPending && (
                                            <LoadingBox/>
                                        )}
                                        {/*<a href={data}><button type='button' className='primary block'>Pagar</button></a>*/}
                                        <a href={data}><button type='button' className='primary block'>Pagar</button></a>
                                        </>
                                        
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