import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// set initial values when cache variables are created

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming, { args, readField }) {
            const merged = existing ? existing.slice(0) : [];
            // Obtain a Set of all existing post IDs.
            const existingIdSet = new Set(
              merged.map((post) => readField("id", post))
            );
            // Remove incoming posts already present in the existing data.
            incoming = incoming.filter(
              (post) => !existingIdSet.has(readField("id", post))
            );
            // Find the index of the post just before the incoming page of posts.
            const afterIndex = merged.findIndex(
              (post) => args.afterId === readField("id", post)
            );
            if (afterIndex >= 0) {
              // If we found afterIndex, insert incoming after that index.
              merged.splice(afterIndex + 1, 0, ...incoming);
            } else {
              // Otherwise insert incoming at the end of the existing data.
              merged.push(...incoming);
            }
            return merged;
          },
        },
        post(_, { args, toReference }) {
          return toReference({
            __typename: "Post",
            id: args.id,
          });
        },
        user: {
          keyArgs: ["id"],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
// User: {
//       fields: {
//         token: {
//           read() {
//             return getAuthToken();
//           },
//         },
//       },
//     },
// const getAuthToken = async () => {
//   try {
//     const value = await AsyncStorage.getItem("@USER_AUTH_TOKEN");
//     if (value !== null) {
//       return value;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };
