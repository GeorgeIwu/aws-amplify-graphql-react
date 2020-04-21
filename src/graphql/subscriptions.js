/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag'

export const onUpdateById = /* GraphQL */ `
  subscription OnUpdateById($id: ID!) {
    onUpdateByID(id: $id) {
      id
      clientId
      beats
      name
    }
  }
`;
export const onCreateDrumMachine = /* GraphQL */ gql`
  subscription OnCreateDrumMachine {
    onCreateDrumMachine {
      id
      clientId
      beats
      name
    }
  }
`;
export const onUpdateDrumMachine = /* GraphQL */ `
  subscription OnUpdateDrumMachine {
    onUpdateDrumMachine {
      id
      clientId
      beats
      name
    }
  }
`;
export const onDeleteDrumMachine = /* GraphQL */ `
  subscription OnDeleteDrumMachine {
    onDeleteDrumMachine {
      id
      clientId
      beats
      name
    }
  }
`;
