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
