import axios from '../axios'
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS } from '../Constants/userConstants'

export const register = (name, email, password) => async(dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {name, email, password}
    })
    try {
        await axios.post('/api/users/register', {name, email, password})
            .then(response => {
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload: response.data,
                })
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: response.data,
                }) //se pone esta funcion porque luego de apretar en el boton de register, se redireccion al home y el header saca la informacion del userInfo de userSigninReducer.
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            })
        
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
}

export const signin = (email, password) => async(dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {email, password}
    })
    try {
        await axios.post('/api/users/signin', {email, password})
            .then(response => {
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: response.data,
                })
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            })
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    }
}

export const signout = () => async(dispatch) => {
    localStorage.removeItem('userInfo');
    //localStorage.removeItem('shippingAddress')
    //localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGNOUT})
}

export const detailsUser = (userId) => async(dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: userId})
    try {
        const {userSignin: {
            userInfo,
        }} = getState();
        await axios.get(`api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then(response => {
                dispatch({
                    type: USER_DETAILS_SUCCESS,
                    payload: response.data
                })
            })
        
    } catch(error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
    }
} 