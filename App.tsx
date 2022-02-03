import { Text, StatusBar, View, ImageBackground } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";

import { getColorScheme } from "./src/helpers";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import { LoginStack, RootStack, TabsStack } from "./src/navigation";
import { AppLoader } from "./src/AppLoader";

export default function App() {
  const showSplash = useCachedResources();
  const colorScheme = useColorScheme();
  const { theme, statusBarStyle } = getColorScheme("AUTOMATIC", colorScheme);

  if (showSplash) {
    return <AppLoader></AppLoader>;
  } else {
    return (
      <ThemeProvider theme={theme.colors}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle={statusBarStyle} />
            <RootStack.Navigator>
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
    );
  }
}
