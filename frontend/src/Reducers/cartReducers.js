import { CART_ADD_ITEM, CART_EMPTY, CART_EMPTY_SHIPPING_ADDRESS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/cartConstants";

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product 
                    ? item
                    : x) //si hay un item que sea igual al que estoy agregando lo cambio y dejo el nuevo
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] //si no hay un item que sea igual, directamente lo agrego al final
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload), //solo quedan en cartItems aquellos items que no sean iguales al que se busca eliminar (los que dan TRUE a la comparacion)
            };

        case CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        
        case CART_EMPTY_SHIPPING_ADDRESS: 
            return {
                ...state,
                shippingAddress: {}
            }

        default:
            return state;
    }
}