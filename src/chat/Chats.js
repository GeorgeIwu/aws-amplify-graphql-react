
import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import {buildSubscription} from 'aws-appsync'
import { graphqlMutation } from 'aws-appsync-react'

import {listChats} from '../_lib/graphql/queries'
import {createChat} from '../_lib/graphql/mutations'
import {onCreateChat} from '../_lib/graphql/subscriptions'
import {useStore} from '../_lib/hooks'

const ListChats = gql(listChats);
const CreateChat = gql(createChat)
const OnCreateChat = gql(onCreateChat);

function Chats({history, ...props}) {
  const {auth: {data: {attributes: { sub: owner } } } } = useStore()

  useEffect(() => {
    props.data.subscribeToMore(
      buildSubscription({query: OnCreateChat, variables: { owner }}, ListChats)
    )
  }, [])

    return (
      <div style={{}}>
        <h1 style={{}}>Members</h1>
        {
          props.chats.map(chat => (
            <div key={chat.id} style={chatStyle} onClick={() => history.push(`/chat/${chat.id}`)}>
              <div style={{}}>
                <p >{chat.name}</p>
              </div>
            </div>
          ))
        }
      </div>
    )
}

export default compose(
  graphqlMutation(CreateChat, ListChats, 'Chats'),
  graphql(ListChats, {
    options: { fetchPolicy: 'cache-and-network' },
    props: ({ data }) => ({
      // asdasd: console.log(data),
      chats: data.listChats ? data.listChats.items : [],
      data
    }),
  })
)(Chats)

const chatStyle = { padding: '10px', fontSize: 14, borderRadius: 4, border: '1px solid grey' }

