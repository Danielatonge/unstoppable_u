import { gql } from "@apollo/client";

export const GET_RECENT_POST = gql`
  query GetPosts($offset: Int) {
    posts(options: { offset: $offset, limit: 10, sort: { createdAt: DESC } })
      @persist {
      id
      content
      createdAt
      likeCount
      commentCount
      liked @client
      user {
        id
        fullName
        userName
        userImage
      }
    }
  }
`;
