import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const useDecodedToken = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@USER_AUTH_TOKEN");
        if (value !== null) {
          setDecodedToken(jwtDecode(value));
        }
      } catch (e) {
        console.error(e);
      }
    };
    getAuthToken();
  }, []);

  return decodedToken;
};
