import React from 'react';
import classes from './Login.module.css';
import logo from './logo.png';
import background from './background.png'
import { Button } from '@material-ui/core';
import { auth, provider , providerFacebook } from '../../firebase';

function Login() {
    const signIn = providerName => e => {
        let currProvider;
        if(providerName === 'google'){
            console.log("google");
            currProvider = provider;
        } else {
            console.log("facebook")
            currProvider = providerFacebook;
            currProvider.addScope('public_profile');
        }
        auth.signInWithPopup(currProvider).catch(err => alert(err.message))
    }
    return (
        <div className={classes.login} style={{ backgroundImage: `url(${background})` }}>
            <div className={classes.login__container}>
                <div className={classes.login__logo}>
                    <img src={logo} alt="Discord Logo" />
                </div>
                <Button onClick={signIn('google')}>Sign In With Google</Button>
                <Button onClick={signIn('facebook')}>Sign In With Facebook</Button>

            </div>
        </div>
    )
}

export default Login
