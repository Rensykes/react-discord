import React from 'react';
import classes from './Login.module.css';
import logo from './logo.png';
import background from './background.png'
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

function Login() {
    const signIn = e => {
        auth.signInWithPopup(provider).catch(err => alert(err.message))
    }
    return (
        <div className={classes.login} style={{ backgroundImage: `url(${background})` }}>
            <div className={classes.login__container}>
                <div className={classes.login__logo}>
                    <img src={logo} alt="Discord Logo" />
                </div>
                <Button onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
