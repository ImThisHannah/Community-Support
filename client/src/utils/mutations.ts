import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation addRequest(
    $description: String!,
    $type: String!,
    $coordinates: [Float]!,
    $urgency: String!,
    $userId: ID!
  ) {
    addRequest(
      description: $description,
      type: $type,
      coordinates: $coordinates,
      urgency: $urgency,
      userId: $userId
    ) {
      id
      description
      type
      location {
        type
        coordinates
      }
      urgency
      status
      user {
        username
        email
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($id: ID!, $username: String, $email: String) {
    updateUserProfile(id: $id, username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;
