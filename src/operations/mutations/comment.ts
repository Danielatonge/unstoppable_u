import { gql } from "@apollo/client";

export const SET_LIKEDUSER_COMMENT = gql`
  mutation setLikedUserComment($commentId: ID!, $userIds: [String!]) {
    updateComments(
      where: { id: $commentId }
      update: { likedUsers: $userIds }
    ) {
      comments {
        id
        content
        likedUsers
        user {
          id
          fullName
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $userId: ID!, $content: String) {
    createComments(
      input: [
        {
          content: $content
          user: { connect: { where: { node: { id: $userId } } } }
          post: { connect: { where: { node: { id: $postId } } } }
        }
      ]
    ) {
      info {
        relationshipsCreated
      }
    }
  }
`;
