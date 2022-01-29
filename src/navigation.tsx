import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, Settings, TouchableOpacity } from "react-native";
import { Tabbar } from "./components/Tabbar";
import { Home } from "./screens/Home";
import { Messenger } from "./screens/Messenger";
import { SearchProfile } from "./screens/SearchProfile";
import { Notification } from "./screens/Notification";

export const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const SearchNav = createNativeStackNavigator();
const NotificationNav = createNativeStackNavigator();
const MessengerNav = createNativeStackNavigator();
// const LoginNav = createNativeStackNavigator();

const HomeStack = () => {
  const { colors } = useTheme();

  return (
    <HomeNav.Navigator>
      <HomeNav.Screen
        name="Feed"
        options={{ headerShown: false }}
        component={Home}
      />
      {/* <HomeNav.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Icon name="Settings" size={25} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeNav.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ route }) => ({
          headerTitle: `${route.params.displayName || "User"}`,
        })}
      />
      <HomeNav.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerTitle: "Edit your profile" }}
      />
      <HomeNav.Screen name="Settings" component={Settings} />
      <HomeNav.Screen name="About" component={About} />
      <HomeNav.Group screenOptions={{ presentation: "modal" }}>
        <HomeNav.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerTitle: "Comments" }}
        />
      </HomeNav.Group> */}
    </HomeNav.Navigator>
  );
};

export const SearchStack = () => {
  const { colors } = useTheme();

  return (
    <SearchNav.Navigator>
      <SearchNav.Screen
        name="SearchProfile"
        component={SearchProfile}
        options={{ headerShown: false }}
      />
      {/* <SearchNav.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          headerTitle: `${route.params.displayName || "User"}`,
        })}
      />
      <SearchNav.Screen name="Settings" component={Settings} />
      <SearchNav.Screen name="About" component={About} />
      <SearchNav.Group screenOptions={{ presentation: "modal" }}>
        <SearchNav.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerTitle: "Comments" }}
        />
      </SearchNav.Group> */}
    </SearchNav.Navigator>
  );
};

export const NotificationStack = () => {
  const { colors } = useTheme();

  return (
    <NotificationNav.Navigator>
      <NotificationNav.Screen
        name="Notificatify"
        component={Notification}
        options={{ headerShown: false }}
      />

      {/* <NotificationNav.Screen
        name="ViewPost"
        component={ViewPost}
        options={({ route }) => ({
          headerTitle: `${route.params.displayName || "User"}`,
        })}
      />
      <NotificationNav.Screen name="Settings" component={Settings} />
      <NotificationNav.Screen name="About" component={About} />
      <NotificationNav.Group screenOptions={{ presentation: "modal" }}>
        <NotificationNav.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerTitle: "Comments" }}
        />
      </NotificationNav.Group> */}
    </NotificationNav.Navigator>
  );
};

export const MessengerStack = () => {
  const { colors } = useTheme();

  return (
    <MessengerNav.Navigator>
      <MessengerNav.Screen
        name="Messages"
        component={Messenger}
        options={{ headerShown: false }}
      />
      {/* <MessengerNav.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          headerTitle: `${route.params.displayName || "User"}`,
        })}
      />
      <MessengerNav.Screen name="Settings" component={Settings} />
      <MessengerNav.Screen name="About" component={About} />
      <MessengerNav.Group screenOptions={{ presentation: "modal" }}>
        <MessengerNav.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerTitle: "Comments" }}
        />
      </MessengerNav.Group> */}
    </MessengerNav.Navigator>
  );
};

// export const LoginStack = () => (
//   <LoginNav.Navigator>
//     <LoginNav.Screen
//       name="LoginSelection"
//       component={LoginSelection}
//       options={({ navigation, route }) => ({
//         headerLeft: () => <Button onPress={navigation.goBack} title="Close" />,
//         headerTitle: "Login",
//       })}
//     />
//     <LoginNav.Screen
//       name="Login"
//       component={Login}
//       options={{ headerTitle: "Sign in" }}
//     />
//     <LoginNav.Screen
//       name="AccountCreation"
//       component={AccountCreation}
//       options={{ headerTitle: "Create your account" }}
//     />
//     <LoginNav.Screen
//       name="AccountPasswordCreation"
//       component={AccountPasswordCreation}
//       options={{ headerTitle: "Create your password" }}
//     />
//   </LoginNav.Navigator>
// );

export const TabsStack = () => (
  <Tab.Navigator tabBar={(props) => Tabbar(props)}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Search" component={SearchStack} />
    <Tab.Screen name="Notification" component={NotificationStack} />
    <Tab.Screen name="Messenger" component={MessengerStack} />
  </Tab.Navigator>
);
