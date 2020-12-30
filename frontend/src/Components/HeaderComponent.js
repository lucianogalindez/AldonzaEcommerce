import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { emptyCart, emptyShippingAddress } from '../Actions/cartActions';
import { signout } from '../Actions/userActions';

export default function HeaderComponent() {

    const [menu, setMenu] = useState(false)
    const [menuAdmin, setMenuAdmin] = useState(false)

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
        closeMenu()
    }

    const handlerMenu = () => {
    
        if (!menu) {
          setMenu(true)
          setMenuAdmin(false)
        } else {
          setMenu(false)
        }
    }

    const handlerMenuAdmin = () => {
    
      if (!menuAdmin) {
        setMenuAdmin(true)
        setMenu(false)
      } else {
        setMenuAdmin(false)
      }
  }

    const closeMenu = () => {
        setMenu(false)
        setMenuAdmin(false)
    }

    return (
        <header className={ headerBg ? 'row header' : 'row headerNoBg'}>
        <div className='brand'>
            <Link to='/' onClick={closeMenu}>
                Aldonza
            </Link>
        </div>
        <div className='info'>
            <Link to="/cart" onClick={closeMenu}>Carrito
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
                  <Link to="/signin" onClick={closeMenu}>Ingresar</Link>
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
              <Link to='/profile'>
                <div className='menuOptions' onClick={handlerMenu}>
                  Perfil
                </div>
              </Link>
            </div>


            {userInfo && userInfo.isAdmin && (
              <Link to='#admin' onClick={handlerMenuAdmin}>Admin <i className='fa fa-caret-down'></i></Link>            
            )}

            <div className={menuAdmin ? 'Menu' : 'hiddenMenu'}>
              <Link to='/detalles'>
                <div className='menuOptions' onClick={handlerMenuAdmin}>
                  Detalles
                </div>
              </Link>
              <Link to='/productlist' onClick={handlerMenuAdmin}>
                <div className='menuOptions'>
                  Productos
                </div>
              </Link>
              <Link to='/orderlist'>
                <div className='menuOptions' onClick={handlerMenuAdmin}>
                  Ordenes
                </div>
              </Link>
            </div>

            
        </div>
    </header>
    )
}
