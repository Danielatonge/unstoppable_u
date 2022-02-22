import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!, $offset: Int) {
    posts(where: { id: $postId }) {
      comments(
        options: { offset: $offset, limit: 5, sort: { createdAt: DESC } }
      ) {
        id
        content
        createdAt
        likedUsers
        user {
          id
          fullName
          userName
          userImage
          currentPosition
        }
      }
    }
  }
`;
