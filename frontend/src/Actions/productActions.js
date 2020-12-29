import axios from '../axios'
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from '../Constants/productConstants';

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        await axios.get('/api/products')
        .then(response => {
            dispatch({type: PRODUCT_LIST_SUCCESS, payload: response.data})
        })
    
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

export const detailsProducts = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
    })
    try {
        await axios.get(`/api/products/${productId}`)
            .then(response => {
                dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: response.data})  
            })
    } catch (error) {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
}

export const createProduct = () => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST,
    })
    const { userSignin: {userInfo}} = getState()
    try {
        await axios.post('/api/products', {}, {
            headers: {
                Authorization: `Baerer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: PRODUCT_CREATE_SUCCESS,
                    payload: response.data.product
                })
            })
    } catch(error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updatedProduct = (product) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST, payload: product});
    const { userSignin: {userInfo}} = getState()
    try {
        await axios.put(`/api/products/${product._id}`, product, {
            headers: {
                Authorization: `Baerer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: PRODUCT_UPDATE_SUCCESS,
                    payload: response.data.product
                })
            })
    } catch(error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteProduct = (productId) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
    const { userSignin: {userInfo}} = getState()

    try {
        await axios.delete(`/api/products/${productId}`, {
            headers: {
                Authorization: `Baerer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: PRODUCT_DELETE_SUCCESS
                })
            })
    } catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}