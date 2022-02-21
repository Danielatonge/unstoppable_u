import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { FIND_COMPLETE_USER_GIVEN_ID } from "../operations/queries/user";

export const useLoggedInUser = () => {
  const [userData, setUserData] = useState(null);
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const [
    getCompleteUserGivenId,
    { data: fetchedUsers, error: errorFetchingUser, loading: loadingUser },
  ] = useLazyQuery(FIND_COMPLETE_USER_GIVEN_ID, { fetchPolicy: "cache-only" });

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@USER_AUTH_TOKEN");
        if (value !== null) {
          setShowHomeScreen(true);
          const { sub } = jwtDecode(value);
          await getCompleteUserGivenId({ variables: { id: sub } });
          setUserData(fetchedUsers.users[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getAuthToken();
  }, []);

  return { userData, errorFetchingUser, loadingUser };
};
