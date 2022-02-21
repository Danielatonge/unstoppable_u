import { gql } from "@apollo/client";

export const GET_RECENT_POST = gql`
  query GetPosts {
    posts(options: { limit: 10, sort: { createdAt: DESC } }) @persist {
      id
      content
      createdAt
      user {
        id
        fullName
        userName
        userImage
      }
    }
  }
`;
