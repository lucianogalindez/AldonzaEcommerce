import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { headerBgOn } from '../Actions/headerActions'
import { register } from '../Actions/userActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'

export default function RegisterScreen(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error } = userRegister

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo: userInfoSignin } = userSignin

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'
    

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Contraseñas no coinciden')
        } else {
            dispatch(register(name, email, password));
        }
    }

    useEffect(() => {
        if(userInfoSignin) {
            props.history.push(redirect);
        }
        dispatch(headerBgOn())
    }, [dispatch, userInfoSignin, props.history, redirect])

    return (
        <div style={{padding: '1rem'}}>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder='Enter name' required onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='email'>Email address</label>
                    <input type='email' id='email' placeholder='Enter email' required onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='Enter password' required onChange={e => setPassword(e.target.value)}>    
                    </input>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Password</label>
                    <input type='password' id='confirmPassword' placeholder='Enter confirm password' required onChange={e => setConfirmPassword(e.target.value)}>    
                    </input>
                </div>    
                <div>
                    <label/>
                    <button className='primary' type='submit'>
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>    
        </div>
    )
}
