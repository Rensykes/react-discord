import React from 'react'
import classes from './SidebarChannel.module.css'
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../../features/appSlice';


export default function SidebarChannel({ id, channelName }) {
    const dispatch = useDispatch();

    return (
        <div className={classes.sidebarChannel} onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName
        }))}>
            <h4><span className={classes.sidebarChannel__hash}>#</span> {channelName}</h4>
        </div>
    )
}
