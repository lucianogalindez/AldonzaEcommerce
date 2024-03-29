import {applyMiddleware, combineReducers, /*compose,*/ createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './Reducers/cartReducers'
import { headerReducer } from './Reducers/headerReducers'
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineReducer, orderPayPendingReducer, orderPayReducer, pendingPaidReducer } from './Reducers/orderReducers'
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './Reducers/productReducers'
import { userDetailsReducer, userReconectReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './Reducers/userReducers'

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: null,
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    }
}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer, 
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderPayPending: orderPayPendingReducer,
    orderMineList: orderMineReducer,
    headerBG: headerReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    pendingPaid: pendingPaidReducer,
    userReconect: userReconectReducer //hago esto xq algunas veces se olvida user Info al redireccionar a la pagina
})

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;
