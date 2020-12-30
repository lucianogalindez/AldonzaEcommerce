import { 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_MINE_LIST_FAIL, 
    ORDER_MINE_LIST_REQUEST, 
    ORDER_MINE_LIST_SUCCESS, 
    ORDER_PAY_FAIL, 
    ORDER_PAY_PENDING_FAIL, 
    ORDER_PAY_PENDING_REQUEST, 
    ORDER_PAY_PENDING_SUCCESS, 
    ORDER_PAY_REQUEST, 
    ORDER_PAY_SUCCESS, 
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL, 
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_PENDING_PAID_REQUEST,
    ORDER_PENDING_PAID_SUCCESS,
    ORDER_PENDING_PAID_FAIL,
} from "../Constants/orderConstants"
import axios from '../axios'
import { CART_EMPTY } from "../Constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        const {
            userSignin: {userInfo},
        } = getState(); //devuelve el estado de la variable userInfo dentro de userSignin
        await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_CREATE_SUCCESS,
                    payload: response.data.order
                })
                dispatch({
                    type: CART_EMPTY
                })
                localStorage.removeItem('cartItems'); 
            })
    } catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, paylaod: orderId});
    try {
        const {
            userSignin: {userInfo},
        } = getState();
        await axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_DETAILS_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}})

    try {
        const {
            userSignin: {userInfo},
        } = getState()
        await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_PAY_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const pendingOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_PAY_PENDING_REQUEST, payload: orderId})
    
    try {
        const {
            userSignin: {userInfo},
        } = getState()
        
        await axios.put(`/api/orders/${orderId}/pending`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_PAY_PENDING_SUCCESS,
                    payload: response.data
                })
            }) 
    } catch(error) {
        dispatch({
            type: ORDER_PAY_PENDING_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST})

    try {
        const {
            userSignin: {userInfo},
        } = getState();
        await axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
            .then(response => {
                dispatch({
                    type: ORDER_MINE_LIST_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        await axios.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                console.log('hola')
                dispatch({
                    type: ORDER_LIST_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST, payload: orderId})
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        axios.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_DELETE_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}   

export const paidPendingOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_PENDING_PAID_REQUEST, payload: {orderId}})

    try {
        const {
            userSignin: {userInfo},
        } = getState()
        await axios.put(`/api/orders/${orderId}/paidPending`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_PENDING_PAID_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_PENDING_PAID_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DELIVER_REQUEST, payload: {orderId}})

    try {
        const {
            userSignin: {userInfo},
        } = getState()
        await axios.put(`/api/orders/${orderId}/deliver`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: ORDER_DELIVER_SUCCESS,
                    payload: response.data
                })
            })
    } catch(error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.response
        })
    }
}
