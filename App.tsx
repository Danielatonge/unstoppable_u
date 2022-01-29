import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";

import { getColorScheme } from "./src/helpers";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import { RootStack, TabsStack } from "./src/navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { theme, statusBarStyle } = getColorScheme("AUTOMATIC", colorScheme);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme.colors}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle={statusBarStyle} />
            <RootStack.Navigator initialRouteName="Home">
              <RootStack.Screen
                name="Main"
                component={TabsStack}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
