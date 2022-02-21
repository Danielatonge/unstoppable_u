import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        id
        type
        fullName
        userImage
        email
      }
    }
  }
`;
