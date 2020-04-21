import React, {useEffect} from 'react';
import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import {listChats} from '../graphql/queries'

const reader = async () => {
  const data = await API.graphql(graphqlOperation(gql`${listChats}`, { limit: 10 }))
  console.log({data});
}

const Tasks = () => {

  useEffect(() => {
    reader()
  }, []);

  return (
      <div>
        Tasks
      </div>
  )
};

export default Tasks;
