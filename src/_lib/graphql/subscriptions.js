/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($owner: String!) {
    onCreateChat(owner: $owner) {
      id
      name
      owner
      members
      messages {
        items {
          id
          text
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($owner: String!) {
    onUpdateChat(owner: $owner) {
      id
      name
      owner
      members
      messages {
        items {
          id
          text
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($owner: String!) {
    onDeleteChat(owner: $owner) {
      id
      name
      owner
      members
      messages {
        items {
          id
          text
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
      id
      text
      owner
      type
      chat {
        id
        name
        owner
        members
        messages {
          nextToken
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
      id
      text
      owner
      type
      chat {
        id
        name
        owner
        members
        messages {
          nextToken
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
      id
      text
      owner
      type
      chat {
        id
        name
        owner
        members
        messages {
          nextToken
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
