import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getColorScheme } from "./src/helpers";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import { LoginStack, RootStack, TabsStack } from "./src/navigation";
import { AppLoader } from "./src/AppLoader";
import { useApolloClient } from "./src/hooks/useApolloClient";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

if (__DEV__) {
  import("./ReactotronConfig");
}

export default function App() {
  const showSplash = useCachedResources();
  const colorScheme = useColorScheme();
  const { theme, statusBarStyle } = getColorScheme("AUTOMATIC", colorScheme);
  const { client, clearCache } = useApolloClient();
  const [authToken, setAuthToken] = useState("");
  // clearCache();

  useEffect(() => {
    const readCachedUser = async () => {
      try {
        const value = await AsyncStorage.getItem("@USER_AUTH_TOKEN");
        if (value !== null) {
          setAuthToken(value);
        }
      } catch (e) {
        console.log("Custom Error(Not found user auth token): ", e);
      }
    };
    readCachedUser();
  }, []);

  if (showSplash || !client) {
    return <AppLoader></AppLoader>;
  } else {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme.colors}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle={statusBarStyle} />
              <RootStack.Navigator
                initialRouteName={authToken ? "Main" : "CreationModal"}
              >
                <RootStack.Group>
                  <RootStack.Screen
                    name="Main"
                    component={TabsStack}
                    options={{ headerShown: false }}
                  />
                </RootStack.Group>

                <RootStack.Group screenOptions={{ presentation: "card" }}>
                  <RootStack.Screen
                    name="CreationModal"
                    options={{
                      headerShown: false,
                    }}
                    component={LoginStack}
                  />
                </RootStack.Group>
              </RootStack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
