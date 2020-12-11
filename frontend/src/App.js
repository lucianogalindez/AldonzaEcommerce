import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { emptyCart, emptyShippingAddress } from './Actions/cartActions';
import { signout } from './Actions/userActions';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen'
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductScreen from './Screens/ProductScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SigninScreen from './Screens/SigninScreen';

function App() {

  const [menu, setMenu] = useState(false)

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const headerBG = useSelector(state => state.headerBG)
  const { headerBg } = headerBG

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;

  const dispatch = useDispatch()

  const signoutHandler = () => {
      dispatch(signout())
      dispatch(emptyCart())
      dispatch(emptyShippingAddress())
  }

  const handlerMenu = () => {
    console.log(menu)
    if (!menu) {
      setMenu(true)
    } else {
      setMenu(false)
    }
  }

  useEffect (() => {
    if(!userInfo) {
      setMenu(false)
    }
  }, [userInfo, dispatch])

  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className={ headerBg ? 'row header' : 'row headerNoBg'}>
        <div className='brand'>
            <Link to='/'>
                Aldonza
            </Link>
        </div>
        <div className='info'>
            <Link to="/cart">Carrito
            {cartItems.length > 0
             && (
                <span className='badge'>{cartItems.length}</span>
             )
            }
            </Link>
            <Link to="/signin">
              {
                userInfo ? (
                  <Link to ='#' onClick={handlerMenu}>
                    {(userInfo.name).split(' ')[0]} <i className='fa fa-caret-down'></i>
                  </Link>
                )
                :
                (
                  <Link to="/signin">Ingresar</Link>
                )
              }
            </Link>
            <div className={menu ? 'Menu' : 'hiddenMenu'}>
              <Link to='/' onClick={signoutHandler}>
                <div className='menuOptions'>
                  Salir
                </div>
              </Link>
              <Link to='/orderhistory' onClick={handlerMenu}>
                <div className='menuOptions'>
                  Historial de ordenes
                </div>
              </Link>
              <Link to='#'>
                <div className='menuOptions' onClick={handlerMenu}>
                  Perfil
                </div>
              </Link>
            </div>
        </div>
    </header>
    <main>
      <Route path='/product/:id' component={ProductScreen}></Route>
      <Route path='/cart/:id?' component={CartScreen}></Route>
      <Route path='/signin' component={SigninScreen}></Route>
      <Route path='/register' component={RegisterScreen}></Route>
      <Route path='/shipping' component={ShippingAddressScreen}></Route>
      <Route path='/payment' component={PaymentMethodScreen}></Route>
      <Route path='/placeorder' component={PlaceOrderScreen}></Route>
      <Route path='/order/:id' component={OrderScreen}></Route>
      <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
      <Route path='/' component={HomeScreen} exact></Route>
    </main>
    <footer className='row center'>
      Aldonza Local Comercial - San Martin 667
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
