
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'

import {listChats} from '../_lib/graphql/queries'
import {onCreateChat} from '../_lib/graphql/subscriptions'
import {useStore} from '../_lib/hooks'

const ListChats = gql(listChats);
const OnCreateChat = gql(onCreateChat);

function Chats({history}) {
  const [ chats, setChats ] = useState([])
  const {auth: {data: {attributes: { sub: owner } } } } = useStore()
  const { data: listChats } = useQuery(ListChats)
  const { data: onCreateChat } = useSubscription(OnCreateChat, { variables: { owner } })

  useEffect(() => {
    if (listChats) {
      setChats(listChats.listChats.items || [])
    }
  }, [listChats])

  useEffect(() => {
    console.log({onCreateChat})
  }, [onCreateChat])

  return (
    <div style={{}}>
      <h1 style={{}}>Members</h1>
      {
        chats.map(chat => (
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

export default Chats

const chatStyle = { padding: '10px', fontSize: 14, borderRadius: 4, border: '1px solid grey' }

