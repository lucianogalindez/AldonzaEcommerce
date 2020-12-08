import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../Actions/userActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'

export default function SigninScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo, loading, error } = userSignin

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect])

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Ingresar</h1>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='Enter email' required onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' placeholder='Enter password' required onChange={e => setPassword(e.target.value)}>    
                    </input>
                </div>    
                <div>
                    <label/>
                    <button className='primary' type='submit'>
                        Ingresar
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Nuevo cliente? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Crea tu cuenta</Link>
                    </div>
                </div>
            </form>    
        </div>
    )
}
