import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// set initial values when cache variables are created

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        token: {
          read() {
            return getAuthToken();
          },
        },
      },
    },
  },
});

const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@USER_AUTH_TOKEN");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};
