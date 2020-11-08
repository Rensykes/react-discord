import { Avatar } from '@material-ui/core';
import React from 'react'
import classes from './Message.module.css';


function Message({user, message, timestamp}) {
    return (
        <div className={classes.message}>
            <Avatar src={user.photo}/>
            <div className={classes.message__info}>
                <h4>{user.displayName} 
                    <span className={classes.message__timestamp}>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
