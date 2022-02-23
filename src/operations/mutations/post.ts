import { gql } from "@apollo/client";

export const SET_LIKEDUSER_POST = gql`
  mutation setLikedUser($postId: ID!, $userIds: [String!]) {
    updatePosts(where: { id: $postId }, update: { likedUsers: $userIds }) {
      posts {
        id
        content
        commentCount
        likedUsers
        user {
          id
          fullName
        }
      }
    }
  }
`;

export const SET_BOOKMARK_POST = gql`
  mutation setPostAsBookmarked($userId: ID!, $postId: ID!) {
    updateUsers(
      where: { id: $userId }
      update: {
        bookmarkedPosts: { connect: { where: { node: { id: $postId } } } }
      }
    ) {
      users {
        id
        fullName
        bookmarkedPosts {
          id
          content
        }
      }
    }
  }
`;

export const REMOVE_BOOKMARK_POST = gql`
  mutation setPostAsBookmarked($userId: ID!, $postId: ID!) {
    updateUsers(
      where: { id: $userId }
      update: {
        bookmarkedPosts: { disconnect: { where: { node: { id: $postId } } } }
      }
    ) {
      users {
        id
        fullName
        bookmarkedPosts {
          id
          content
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createUserPost(
    $content: String
    $extraContent: String
    $links: String
    $userId: ID!
  ) {
    createPosts(
      input: [
        {
          content: $content
          extraContent: $extraContent
          links: $links
          user: { connect: { where: { node: { id: $userId } } } }
        }
      ]
    ) {
      posts {
        id
        content
        createdAt
      }
    }
  }
`;
