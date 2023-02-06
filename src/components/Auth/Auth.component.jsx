import { useReducer, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCurrentUser } from '../../store/user/user.action';

import Alert from '../UI/Alert/Alert.component';

import styles from './Auth.module.css';

const INITIAL_STATE = {
    isAlert: false,
    message: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_IS_ALERT':
            return { ...state, isAlert: payload };
        case 'SET_ERROR_MESSAGE':
            console.log('error');
            return { ...state, isAlert: true, message: payload };
        default:
            return { ...state };
    }
}

const Auth = () => {
    const [ state, localDispatch ] = useReducer(authReducer, INITIAL_STATE);
    const { isAlert, message } = state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        const timeOutHandler = setTimeout(() => {
            localDispatch({
                type: 'SET_IS_ALERT',
                payload: false
            });
        }, 3000);

        return () => {
            clearTimeout(timeOutHandler);
        }
    }, [isAlert])

    const formLoginHandler = (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        if ('tps@gmail.com' === emailValue && 'test1234' === passwordValue) {
            const loginUser = {
                email: emailValue,
                password: passwordValue
            };

            dispatch(setCurrentUser(loginUser));
            navigate('/');
        } else {
            localDispatch({type: 'SET_ERROR_MESSAGE', payload: 'Invalid Email/Password'});
        }
    };

    return (
        <div className={`${styles['Auth-form-container']}`}>
            <form className={`${styles['Auth-form']}`}>
                <div className={`${styles['Auth-form-content']}`}>
                    <div className={`${styles['Auth-logo-container']}`}>
                        <img src={process.env.PUBLIC_URL + 'logo192.png'} alt='TPS Logo'/>
                    </div>
                    <h3 className={`${styles['Auth-form-title']}`}>Tax Payor System</h3>
                    { isAlert && <Alert>{message}</Alert> }
                    <div className='form-group mt-3'>
                        <label>Email Address</label>
                        <input type='email' className='form-control mt-1' placeholder='Enter email' ref={emailRef} required />
                    </div>

                    <div className='form-group mt-3'>
                        <label>Password</label>
                        <input type='password' className='form-control mt-1' placeholder='Enter Password' ref={passwordRef} required />
                    </div>

                    <div className='d-grid gap-2 mt-3'>
                        <button type='submit' className='btn btn-primary' onClick={formLoginHandler}>
                            Login
                        </button>
                    </div>

                    {/**<p className={`forgot-password text-right mt-2`}>
                        Forgot <a href='#'>password?</a>
                    </p>**/}
                </div>
            </form>
        </div>
    );
};

export default Auth;