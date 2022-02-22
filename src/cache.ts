import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// set initial values when cache variables are created

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming, { args: { offset = 10 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            // const merged = existing ? existing.slice(0) : [];
            // for (let i = 0; i < incoming.length; ++i) {
            //   merged[offset + i] = incoming[i];
            // }
            return [...existing, ...incoming];
          },
        },
        post(_, { args, toReference }) {
          return toReference({
            __typename: "Post",
            id: args.id,
          });
        },
        users: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      fields: {
        token: {
          read(liked = false) {
            return liked;
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
