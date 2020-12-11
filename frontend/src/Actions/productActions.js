import axios from '../axios'
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../Constants/productConstants';

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