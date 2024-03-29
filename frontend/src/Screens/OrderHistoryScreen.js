import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerBgOn } from '../Actions/headerActions'
import { listOrderMine } from '../Actions/orderActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'

export default function OrderHistoryScreen(props) {

    const orderMineList = useSelector(state => state.orderMineList)
    const {orders, loading, error} = orderMineList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listOrderMine())
        dispatch(headerBgOn())
    }, [dispatch])

    return (
        <div style={{padding: '1rem'}}>
            <h1>Order History</h1>
            {loading ? <LoadingBox />
            : error? <MessageBox variant='danger'>{error}</MessageBox>
            : 
            (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
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
