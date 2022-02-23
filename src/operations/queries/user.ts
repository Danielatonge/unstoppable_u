import { gql } from "@apollo/client";

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    user @persist {
      id
      fullName
      userName
      userImage
    }
  }
`;

export const FIND_USER_GIVEN_ID = gql`
  query findUserGivenId($id: ID!) {
    users(where: { id: $id }) @persist {
      id
      fullName
      userName
      userImage
    }
  }
`;

export const FIND_COMPLETE_USER_GIVEN_ID = gql`
  query findCompleteUserGivenId($id: ID!) {
    users(where: { id: $id }) @persist {
      id
      type
      fullName
      userName
      userImage
      email
      currentPosition
      goal
      address
      city
      state
      country
      averageRating
      createdAt
    }
  }
`;
