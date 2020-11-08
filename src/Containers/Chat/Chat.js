import React, { useState, useEffect } from 'react';
import classes from './Chat.module.css';
import ChatHeader from '../../Components/ChatHeader/ChatHeader';
import Message from '../../Components/Message/Message';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import db from '../../firebase';
import firebase from 'firebase';

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(channelId)
            db.collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                })
    }, [channelId])

    const sendMessage = event => {
        event.preventDefault();
        db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user
            })

        setInput("");
        return false;
    }

    return (
        <div className={classes.chat}>
            <ChatHeader channelId={channelId} channelName={channelName} />

            <div className={classes.chat__messages}>
                {messages.map(message => (<Message key={message.timestamp} user={message.user} message={message.message} timestamp={message.timestamp}/>))}
            </div>

            <div className={classes.chat__input}>
                <AddCircleIcon fontSize="large" />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} disabled={!channelId} placeholder={`Message #` + channelName} />
                    <button className={classes.chat__inputButton} type="submit" onClick={sendMessage}>Send Message</button>
                </form>

                <div className={classes.chat__inputIcons}>
                    <GifIcon fontSize="large" />
                    <CardGiftcardIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
