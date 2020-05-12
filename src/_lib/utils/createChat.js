
// import { DataStore } from '@aws-amplify/datastore'
// import { Chat } from '../../models'
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
// import { v4 as uuid } from 'uuid';
import {createChat as addChat} from '../graphql/mutations'

const createChat = async (chatuser) => {
  // id: uuid(),
  const input = { name: chatuser, createdAt: new Date() }
  console.log('creating chat', input)
  const data = await API.graphql(graphqlOperation(gql`${addChat}`, {input}))

  return data
}

export default createChat
