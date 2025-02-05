import { gql } from '@apollo/client';

export const QUERY_USER_PROFILE = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_REQUESTS = gql`
  query getRequests {
    getRequests {
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
