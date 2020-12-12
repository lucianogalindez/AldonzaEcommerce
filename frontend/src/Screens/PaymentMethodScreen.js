import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../Actions/cartActions'
import { headerBgOn } from '../Actions/headerActions'
import CheckoutSteps from '../Components/CheckoutSteps'

export default function PaymentMethodScreen(props) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress.address) {
        props.history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    useEffect(() => {
        dispatch(headerBgOn())
    }, [dispatch])

    return (
        <div style={{padding: '1rem'}}>
            <CheckoutSteps step1 step2 step3 />
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input 
                            type='radio' 
                            id='paypal' 
                            value='paypal' 
                            name='paymentMethod' 
                            required 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='paypal'>Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type='radio' 
                            id='mercadopago' 
                            value='mercadopago' 
                            name='paymentMethod' 
                            required 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='mercadopago'>Mercado Pago</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>
                        Continue 
                    </button>
                </div>
            </form>
        </div>
    )
}
