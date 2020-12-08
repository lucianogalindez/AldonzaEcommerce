import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { emptyCart, emptyShippingAddress } from './Actions/cartActions';
import { signout } from './Actions/userActions';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen';
import SigninScreen from './Screens/SigninScreen';

function App() {

  const [menu, setMenu] = useState(false)

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

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
  }, [userInfo])

  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
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
              <Link to='#'>
                <div className='menuOptions'>
                  Historial de ordenes
                </div>
              </Link>
              <Link to='#'>
                <div className='menuOptions'>
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
      <Route path='/' component={HomeScreen} exact></Route>
    </main>
    <footer className='row center'>
      Alzonda Local Comercial - San Martin 667
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
