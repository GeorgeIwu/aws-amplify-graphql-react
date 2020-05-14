
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { graphql, compose } from 'react-apollo'
import {buildSubscription} from 'aws-appsync'
import { graphqlMutation } from 'aws-appsync-react'
import gql from 'graphql-tag'

import {getChat} from '../_lib/graphql/queries'
import {createMessage} from '../_lib/graphql/mutations'
import {onCreateMessage} from '../_lib/graphql/subscriptions'
import {useStore} from '../_lib/hooks'

const initialState = { text: '' }
const GetChat = gql(getChat);
const CreateMessage = gql(createMessage)
const OnCreateMessage = gql(onCreateMessage);

function ChatMessages({match, ...props}) {
  const {auth: {data: {attributes: { sub: owner } } } } = useStore()
  const [formState, updateFormState] = useState(initialState)
  const {id} = match.params
  console.log(id, owner)

  useEffect(() => {
    props.data.subscribeToMore(
      buildSubscription({query: OnCreateMessage, variables: { owner }}, {query: GetChat, variables: { id }})
    )
  }, [])

  const onChange = (e) => updateFormState({ ...formState, text: e.target.value })

  const addMessage = async () => {
    if (!formState.text) return
    const input = { text: formState.text, createdAt: new Date(), updatedAt: new Date(), messageChatId: id, type: 'DRUG' }
    props.createMessage({input})
    updateFormState(initialState)
  }

  return (
    <div style={{}}>
      <h1 style={{}}>Messages</h1>
      {props.messages.map(message => (
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

// GetChat
// (props) => {
//   console.log(props)
//   return {
//     'auto': GetChat,
//     // 'auto': { query: GetChat, variables: { status: 'done' } }
//   }
// },
export default compose(
  graphqlMutation(CreateMessage, GetChat, 'Chat'),
  graphql(GetChat, {
    options: (props) => ({
      fetchPolicy: 'cache-and-network',
      variables: { id: props.match.params.id }
    }),
    props: ({data}) => ({
      messages: data.getChat ? data.getChat.messages.items : [],
      data
    })
  })
)(ChatMessages)
