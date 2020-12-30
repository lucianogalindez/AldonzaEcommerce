import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerBgOn } from '../Actions/headerActions';
import { deleteOrder, listOrders } from '../Actions/orderActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { ORDER_DELETE_RESET } from '../Constants/orderConstants';

export default function OrderListScreen(props) {
    
    const orderList = useSelector(state => state.orderList)
    const {orders, loading, error} = orderList

    const dispatch = useDispatch()

    const orderDelete = useSelector(state => state.orderDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = orderDelete

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET})
        dispatch(listOrders());
        dispatch(headerBgOn())
    }, [dispatch, successDelete])

    const deleteHandler = (order) => {
        if(window.confirm('Estas seguro de eliminar la order ?')) {
            dispatch(deleteOrder(order._id))
        }
    }
    
    return (
        <div style={{padding: '1rem'}}>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {loading ? <LoadingBox />
            : error? <MessageBox variant='danger'>{error}</MessageBox>
            : 
            (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{
                                    order.isPaid 
                                    ? order.paidAt.substring(0, 10) 
                                    : order.isPaidPending
                                    ? 'In process'
                                    : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <button 
                                            type='button' 
                                            className='small'
                                            onClick={() => {props.history.push(`/order/${order.paymentMethod}/${order._id}`)}}
                                        >
                                            Details
                                        </button>
                                        <button type='button' className='small' onClick={() => deleteHandler(order)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
            }
        </div>
    )
}
