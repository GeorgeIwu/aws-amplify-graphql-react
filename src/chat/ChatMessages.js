
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import {getChat} from '../_lib/graphql/queries'
import {createMessage} from '../_lib/graphql/mutations'
import {onCreateMessage} from '../_lib/graphql/subscriptions'
import {useStore} from '../_lib/hooks'

const initialState = { text: '' }

function ChatMessages({match}) {
  const [formState, updateFormState] = useState(initialState)
  const [chatMessages, updateChatMessages] = useState([])
  const {id} = match.params
  const {data: {attributes}} = useStore().auth
  const owner = attributes.sub

  useEffect(() => {
    fetchChatMessages()
    const subscription = API.graphql(graphqlOperation(gql`${onCreateMessage}`, { owner })).subscribe(() => fetchChatMessages());
    return () => subscription.unsubscribe();
  }, [])

  const onChange = (e) => {
    updateFormState({ ...formState, text: e.target.value })
  }

  const fetchChatMessages = async () => {
    const results = await API.graphql(graphqlOperation(gql`${getChat}`, { id }))
    const newChatMessages = results.data.getChat.messages.items
    console.log(newChatMessages)
    updateChatMessages(newChatMessages.length ? newChatMessages: chatMessages)
  }

  const addMessage = async () => {
    if (!formState.text) return
    const input = { text: formState.text, createdAt: new Date(), updatedAt: new Date(), messageChatId: id }
    await API.graphql(graphqlOperation(gql`${createMessage}`, {input}))
    updateFormState(initialState)
  }

  return (
    <div style={{}}>
      <h1 style={{}}>Messages</h1>
      {chatMessages.map(message => (
          <div key={message.id} style={{}}>
            <div style={{}}>
              <p style={{}}>{message.text}</p>
            </div>
          </div>
        ))
      }
      <div>
        <Input
          onChange={onChange}
          name='text'
          placeholder='add message'
          value={formState.text}
          style={{}}
        />
        <Button type='primary' onClick={addMessage}>Create Message</Button>
      </div>

    </div>
  )
}

export default ChatMessages
