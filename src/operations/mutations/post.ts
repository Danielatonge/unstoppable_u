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