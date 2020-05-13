/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
