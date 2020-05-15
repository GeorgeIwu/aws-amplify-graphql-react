
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { graphql, compose } from 'react-apollo'
import {buildSubscription} from 'aws-appsync'
import { graphqlMutation } from 'aws-appsync-react'
import gql from 'graphql-tag'

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

function ChatMessages({match, ...props}) {
  const {auth: {data: {attributes: { sub: owner } } } } = useStore()
  const [formState, updateFormState] = useState(initialState)
  const {id} = match.params
  // console.log(props.data)

  useEffect(() => {
    props.data.subscribeToMore(buildSubscription({query: OnCreateMessage, variables: { owner }}, {query: GetChat, variables: { id }}))
    props.data.subscribeToMore(buildSubscription({query: OnDeleteMessage, variables: { owner }}, {query: GetChat, variables: { id }}))
  }, [])

  const onChange = (e) => updateFormState({ ...formState, text: e.target.value })

  const addMessage = async () => {
    const {text} = formState
    if (!text) return
    const input = { text, owner, type: 'DRUG', messageChatId: id, createdAt: new Date(), updatedAt: new Date() }
    props.createMessage({input})
    updateFormState(initialState)
  }

  const removeMessage = async (id) => {
    const input = { id }
    props.deleteMessage({input})
  }

  return (
    <div style={{}}>
      <h1 style={{}}>Messages</h1>
      {props.messages.map(message => (
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

// GetChat
// (props) => {
//   console.log(props)
//   return {
//     'auto': GetChat,
//     // 'auto': { query: GetChat, variables: { status: 'done' } }
//   }
// },
export default compose(
  graphql(GetChat, {
    options: (props) => ({
      fetchPolicy: 'cache-and-network',
      variables: { id: props.match.params.id }
    }),
    props: ({data}) => ({
      messages: data.getChat ? data.getChat.messages.items : [],
      data
    })
  }),
  graphqlMutation(CreateMessage, GetChat, 'Chat'),
  graphqlMutation(DeleteMessage, GetChat, 'Chat'),
)(ChatMessages)
