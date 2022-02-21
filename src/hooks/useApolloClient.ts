import { useCallback, useEffect, useState } from "react";
import {
  ApolloClient,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistenceMapper, createPersistLink } from "../utils/persistence";
import { cache } from "../cache";

export const useApolloClient = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();
  const clearCache = useCallback(() => {
    if (!persistor) {
      return;
    }
    persistor.purge();
  }, [persistor]);

  useEffect(() => {
    async function init() {
      let newPersistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
        debug: __DEV__,
        trigger: "background",
        persistenceMapper,
      });
      await newPersistor.restore();
      setPersistor(newPersistor);
      const persistLink = createPersistLink();
      const httpLink = createHttpLink({
        uri: "https://unstoppable-universe.vercel.app/api/graphql",
      });
      setClient(
        new ApolloClient({
          link: persistLink.concat(httpLink),
          cache,
        })
      );
    }

    init();
  }, []);

  return {
    client,
    clearCache,
  };
};
