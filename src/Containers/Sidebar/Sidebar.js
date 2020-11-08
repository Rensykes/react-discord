import React, { useState, useEffect } from 'react'
import classes from './Sidebar.module.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from '../../Components/SidebarChannel/SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';

export default function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                        id: doc.id,
                        channel: doc.data()
                    })
                )))
        );
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");

        if (channelName) {
            db.collection("channels").add({ channelName: channelName })
        }
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar__top}>
                <h3>Room</h3>
                <ExpandMoreIcon />
            </div>
            <div className={classes.sidebar__channels}>
                <div className={classes.sidebar__channelsHeader}>
                    <div className={classes.sidebar__header}>
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className={classes.sidebar__addChannel} onClick={handleAddChannel} />

                </div>
                <div className={classes.sidebar__channelsList}>
                    {channels.map(({id, channel}) => (<SidebarChannel key={id} id={id} channelName={channel.channelName}/>))}
                </div>
            </div>

            <div className={classes.sidebar__voice}>
                <SignalCellularAltIcon
                    className={classes.sidebar__voiceIcon}
                    fontSize="large"
                />
                <div className={classes.sidebar_voiceInfo}>
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className={classes.sidebar__voiceIcons}>
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className={classes.sidebar__profile}>
                <Avatar src={user.photo} onClick={() => auth.signOut()} />
                <div className={classes.sidebar__profileInfo}>
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
                <div className={classes.sidebar__profileIcons}>
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}
