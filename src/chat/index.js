import React from 'react';
import {PrivateRoute} from '../_lib/components'
import Chats from './Chats'
import ChatMessages from './ChatMessages'

const Chat = () => (
  <div>
    <PrivateRoute exact path="/chat" component={Chats} />
    <PrivateRoute exact path="/chat/:id" component={ChatMessages} />
  </div>
);

export default Chat;
