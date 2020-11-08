import React, { useEffect } from 'react';
import './App.css';
import Login from './Containers/Login/Login';
import Sidebar from './Containers/Sidebar/Sidebar';
import Chat from './Containers/Chat/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice';
import { auth } from './firebase';
import {login, logout} from './features/userSlice'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser)
      if (authUser) {
        //the user is logged in
        dispatch(login({ 
          uid: authUser.uid, 
          photo: authUser.photoURL, 
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        //the user is logged out
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>) :
        (<Login />)
      }

    </div>
  );
}

export default App;
