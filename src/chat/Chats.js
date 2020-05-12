
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import {listChats} from '../_lib/graphql/queries'
import {onCreateChat} from '../_lib/graphql/subscriptions'
import {useStore} from '../_lib/hooks'

function Chats({history}) {
  const [chats, updateChats] = useState([])
  const {data: {attributes}} = useStore().auth
  const owner = attributes.sub

  useEffect(() => {
    fetchChats()
    const subscription = API.graphql(graphqlOperation(gql`${onCreateChat}`, { owner })).subscribe(() => fetchChats());
    return () => subscription.unsubscribe();
  }, [])

  async function fetchChats() {
    const results = await API.graphql(graphqlOperation(gql`${listChats}`, { limit: 10 }))
    const chats = results.data.listChats.items
    updateChats(chats)
  }

  console.log(chats)

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

const chatStyle = { padding: '10px', fontSize: 14, borderRadius: 4, border: '1px solid grey' }
// const container = { width: '100%', padding: 40, maxWidth: 900 }
// const input = { marginBottom: 10 }
// const button = { marginBottom: 10 }
// const heading = { fontWeight: 'normal', fontSize: 40 }
// const messageBg = { backgroundColor: 'white' }
// const messageTitle = { margin: 0, padding: 9, fontSize: 20  }

export default Chats
