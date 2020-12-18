/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerBgOn } from '../Actions/headerActions'
import { detailsUser, updateUserProfile } from '../Actions/userActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../Constants/userConstants'

export default function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const userDetails = useSelector(state => state.userDetails)
    const { user, error, loading } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate, error: errorUpdate, loading : loadingUpdate } = userUpdateProfile

    const dispatch = useDispatch()

    useEffect(() => {

        console.log(user)

        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
            dispatch({type: USER_UPDATE_PROFILE_RESET})
        }
        dispatch(headerBgOn())
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched')
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password
            }))
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div><h1>User Profile</h1></div>
                {loading ? <LoadingBox/>
                : error ? <MessageBox variant='danger'>{error}</MessageBox>
                : 
                (
                    <>
                    {loadingUpdate && <LoadingBox />}
                    {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant='success'>Profile Updated Successfully</MessageBox>}
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                id='name' 
                                type='text' 
                                placeholder='Enter name' 
                                value={name}
                                onChange={(e) => setName(e.target.value)}   
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input 
                                id='email' 
                                type='email' 
                                placeholder='Enter email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}   
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input 
                                id='password' 
                                type='password' 
                                placeholder='Enter password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='confirmPassword'>confirm Password</label>
                            <input 
                                id='confirmPassword' 
                                type='password' 
                                placeholder='Enter confirm password' 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label/>
                            <button type='submit' className='primary'>
                                Update
                            </button>
                        </div>
                    </>
                )
                }
            </form>
            
        </div>
    )
}
