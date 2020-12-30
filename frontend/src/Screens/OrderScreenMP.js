/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deliverOrder, detailsOrder, paidPendingOrder, /*payOrder,*/ pendingOrder } from '../Actions/orderActions';
import LoadingBox from "../Components/LoadingBox";
import MessageBox from '../Components/MessageBox'
import { ORDER_DELIVER_RESET, ORDER_PAY_PENDING_RESET, ORDER_PENDING_PAID_RESET } from '../Constants/orderConstants';
import axios from '../axios'
import { headerBgOn } from '../Actions/headerActions';
import { reconect } from '../Actions/userActions';

export default function OrderScreenMP(props) {

    
    const orderId = props.match.params.id;
    const status = props.match.params.status;

    const [data, setData] = useState('')
    const [order, setOrder] = useState('')

    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {/*order,*/ loading, error} = orderDetails

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    /*Si la orden se encuentra con pago pendiente*/
    const orderPayPending = useSelector(state => state.orderPayPending)
    const {loading: loadingPayPending, error: errorPayPending, success: successPayPending} = orderPayPending

    const pendingPaid = useSelector(state => state.pendingPaid)
    const {loading: loadingPendingPaid, error: errorPendingPaid, success: successPendingPaid} = pendingPaid
    //cuando el admin recibe el pago y lo notifica

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver


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
        if (status === 'pending') {
            dispatch(pendingOrder(orderId))
            /*setTimeout(() => {
                dispatch(detailsOrder(orderId))
            }, 200);*/
        }

    }, [dispatch, status, orderId, userInfo])

    useEffect(() => {

        const getOrders = async (orderId) => {

            try { await axios.get(`/api/orders/${orderId}`/*, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }*/)
                .then(response => {
                    setOrder(response.data)
                    if (!userInfo) {
                        dispatch(reconect(response.data.user.email, response.data.user.password))
                        console.log('hola')
                    }
                })
            } catch(error) {
                console.log(error)
            }
        }

        if(!order || successPendingPaid || successPayPending || successDeliver || (order && order._id !== orderId)) {
            dispatch({type: ORDER_PENDING_PAID_RESET})
            dispatch({type: ORDER_PAY_PENDING_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            /*dispatch(detailsOrder(orderId))*/
            getOrders(orderId)
            console.log('hola')
        } else {
            addMercadoPagoScript()
        }

        console.log(userInfo)
    
        dispatch(headerBgOn())
        console.log(order.user)

    }, [dispatch, order, orderId, successPendingPaid, successPayPending, successDeliver, userInfo])


    const payHandler = () => {
        dispatch(paidPendingOrder(order._id))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }

    
    return !order 
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
                                        {errorPendingPaid && (
                                            <MessageBox variant='danger'>
                                                {errorPendingPaid}
                                            </MessageBox>
                                        )}
                                        {errorPayPending && (
                                            <MessageBox variant='danger'>
                                                {errorPayPending}
                                            </MessageBox>
                                        )}
                                        {errorDeliver && (
                                            <MessageBox variant='danger'>
                                                {errorDeliver}
                                            </MessageBox>
                                        )}
                                        {loadingPendingPaid && (
                                            <LoadingBox/>
                                        )}
                                        {loadingPayPending && (
                                            <LoadingBox/>
                                        )}
                                        {loadingDeliver && (
                                            <LoadingBox/>
                                        )}
                                        {/*<a href={data}><button type='button' className='primary block'>Pagar</button></a>*/}
                                        <a href={data} target='_blank'><button type='button' className='primary block'>Pagar</button></a>
                                        </>
                                        
                                    </li>
                                )
                            }
                            {/*{userInfo.isAdmin && order.isPaidPending && !order.isPaid && (
                                <li>
                                    <button type='button' onClick={payHandler} className='primary block'>
                                        Order Was Paid
                                    </button>
                                </li>
                            )}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <li>
                                    <button type='button' onClick={deliverHandler} className='primary block'>
                                        Deliver Order
                                    </button>
                                </li>
                            )}*/}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
