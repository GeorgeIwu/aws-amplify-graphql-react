/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
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
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        members
        messages {
          nextToken
        }
        createdAt
      }
      nextToken
    }
  }
`;
