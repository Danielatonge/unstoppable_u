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
      bookmarkedUsers {
        id
      }
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
    posts(where: { id: $postId }) @persist {
      id
      content
      extraContent
      createdAt
      likedUsers
      commentCount
      bookmarkedUsers {
        id
      }
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

export const GET_POSTS_GIVEN_USERID = gql`
  query GetUserPosts($userId: ID!, $offset: Int) {
    users(where: { id: $userId }) @persist {
      id
      fullName
      userName
      userImage
      currentPosition
      posts(
        options: { offset: $offset, limit: 10, sort: { createdAt: DESC } }
      ) {
        id
        content
        extraContent
        createdAt
        likedUsers
        commentCount
        bookmarkedUsers {
          id
        }
      }
    }
  }
`;

export const GET_BOOKMARKED_POSTS_GIVEN_USERID = gql`
  query GetUserBookmarkedPosts($userId: ID!, $offset: Int) {
    users(where: { id: $userId }) @persist {
      bookmarkedPosts(
        options: { offset: $offset, limit: 10, sort: { createdAt: DESC } }
      ) {
        id
        content
        extraContent
        createdAt
        likedUsers
        commentCount
        bookmarkedUsers {
          id
        }
        user {
          id
          fullName
          userName
          currentPosition
        }
      }
    }
  }
`;
