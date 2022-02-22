import { gql } from "@apollo/client";

export const GET_RECENT_POST = gql`
  query GetPosts($offset: Int) {
    posts(options: { offset: $offset, limit: 10, sort: { createdAt: DESC } })
      @persist {
      id
      content
      extraContent
      createdAt
      likedUsers
      commentCount
      user {
        id
        fullName
        userName
        userImage
        currentPosition
      }
    }
  }
`;


export const GET_POST_GIVEN_ID = gql`
  query GetPosts($postId: ID!) {
    posts(where:{id: $postId})
      @persist {
      id
      content
      extraContent
      createdAt
      likedUsers
      commentCount
      user {
        id
        fullName
        userName
        userImage
        currentPosition
      }
    }
  }
`;