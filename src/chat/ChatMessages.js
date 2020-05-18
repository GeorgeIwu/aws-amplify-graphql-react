
import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { Input, Button } from 'antd'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../_lib/graphql/queries'
import {createMessage, deleteMessage} from '../_lib/graphql/mutations'
import {onCreateMessage, onDeleteMessage} from '../_lib/graphql/subscriptions'
import {useStore} from '../_lib/hooks'

const initialState = { text: '' }
const GetChat = gql(getChat);
const CreateMessage = gql(createMessage)
const DeleteMessage = gql(deleteMessage)
const OnCreateMessage = gql(onCreateMessage);
const OnDeleteMessage = gql(onDeleteMessage);

const optimisticUpdateMessage = ({text, owner, type, messageChatId, createdAt, updatedAt}, chat) => ({
  __typename: "Mutation",
  createMessage: {
    __typename: "Message",
    id: uuid(),
    chat,
    owner,
    text,
    type,
    createdAt,
    updatedAt,
  }
})

const optimisticRemoveMessage = ({ id }, chat) => ({
  __typename: "Mutation",
  deleteMessage: {
    __typename: "Message",
    chat,
    id,
  }
})

const remove = (store, { data, subscriptionData }) => {
  // { data.createMessage.chat
    const oldData = subscriptionData ? store : store.readQuery({ query: GetChat, variables: {id: data.deleteMessage.chat.id} })
    const newData = {...oldData}
    const newItem = subscriptionData ? subscriptionData.data.onCreateMessage : data.deleteMessage
    const newItemIndex = newData.getChat.messages.items.findIndex(message => message.id === newItem.id)

    if (newItemIndex !== -1) {
       newData.getChat.messages.items.splice(newItemIndex, 1)
    }

    console.log(`ran delete`, newData)
    return subscriptionData ? newData : store.writeQuery({ query: GetChat, data: newData, variables: {id: data.deleteMessage.chat.id} })
}

const update = (store, { data, subscriptionData }) => {
  // { data.createMessage.chat
    const oldData = subscriptionData ? store : store.readQuery({ query: GetChat, variables: {id: data.createMessage.chat.id} })
    const newData = {...oldData}
    const newItem = subscriptionData ? subscriptionData.data.onCreateMessage : data.createMessage
    const newItemIndex = newData.getChat.messages.items.findIndex(message => message.id === newItem.id)

    if (newItemIndex === -1) {
      newData.getChat.messages.items = [newItem, ...newData.getChat.messages.items]
    } else {
      newData.getChat.messages.items[newItemIndex] = newItem
    }

    console.log(`ran update`, newData)
    return subscriptionData ? newData : store.writeQuery({ query: GetChat, data: newData, variables: {id: data.createMessage.chat.id} })
}


function ChatMessages({match: { params: { id } } }) {
  const [ chatMessages, setChatMessages ] = useState([])
  const [formState, updateFormState] = useState(initialState)
  const [createMessage] = useMutation(CreateMessage)
  const [deleteMessage] = useMutation(DeleteMessage)
  const { subscribeToMore, data: getChat } = useQuery(GetChat, {variables: { id }})
  const {auth: {data: {attributes: { sub: owner } } } } = useStore()

  useEffect(() => {
    subscribeToMore({document: OnCreateMessage, variables: { owner }, updateQuery: update})
    subscribeToMore({document: OnDeleteMessage, variables: { owner }, updateQuery: remove})
  }, [])

  useEffect(() => {
    if (getChat) {
      setChatMessages(getChat.getChat.messages.items || [])
    }
  }, [getChat])

  const onChange = (e) => updateFormState({ ...formState, text: e.target.value })

  const addMessage = async () => {
    const {text} = formState
    if (!text) return
    const input = { text, owner, type: 'DRUG', messageChatId: id, createdAt: new Date(), updatedAt: new Date() }
    createMessage({
      update,
      variables: { input },
      context: { serializationKey: 'CREATE_MESSAGE' },
      optimisticResponse: optimisticUpdateMessage(input, getChat.getChat),
    })
    updateFormState(initialState)
  }

  const removeMessage = async (id) => {
    const input = { id }
    deleteMessage({
      update: remove,
      variables: { input },
      context: { serializationKey: 'DELETE_MESSAGE' },
      optimisticResponse: optimisticRemoveMessage(input, getChat.getChat),
    })
  }

  return (
    <div style={{}}>
      <h1 style={{}}>Messages</h1>
      {chatMessages.map(message => (
          <div key={message.id}>
            <div style={{display: 'inline-block', marginRight: '20px'}}>
              <p style={{}}>{message.text}</p>
            </div>
            <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => removeMessage(message.id)}>X</div>
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
