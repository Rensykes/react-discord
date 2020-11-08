import React from 'react'
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

function Login() {
    const signIn = e => {
        auth.signInWithPopup(provider).catch(err => alert(err.message))
    }
    return (
        <div className="login">
            The Login Page
            <div className="login__logo">
                <img src="#" />
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
