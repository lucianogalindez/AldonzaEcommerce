import axios from '../axios'
import { CART_ADD_ITEM, CART_EMPTY, CART_EMPTY_SHIPPING_ADDRESS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../Constants/cartConstants'

export const addToCart = (productId, qty) => async(dispatch, getState) => {
    await axios.get(`/api/products/${productId}`)
        .then(response => {
            dispatch ({
                type: CART_ADD_ITEM,
                payload: {
                    name: response.data.name,
                    image: response.data.image,
                    price: response.data.price,
                    countInStock: response.data.countInStock,
                    product: response.data._id,
                    qty: qty,
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) // necesito hacerlo string para guardarlo en el localStorage
        })
    
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch ({
        type: CART_REMOVE_ITEM,
        payload: productId
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch ({type: CART_SAVE_PAYMENT_METHOD, payload: data})
}

export const emptyCart = () => (dispatch, getState) => {
    dispatch ({
        type: CART_EMPTY,
    })
    localStorage.removeItem('cartItems');   
}

export const emptyShippingAddress = () => (dispatch, getState) => {
    dispatch ({
        type: CART_EMPTY_SHIPPING_ADDRESS,
    })
    localStorage.removeItem('shippingAddress');
}
