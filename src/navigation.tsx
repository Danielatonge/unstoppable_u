import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Tabbar } from "./components/Tabbar";
import { Home } from "./screens/Home";
import { Messenger } from "./screens/Messenger";
import { SearchProfile } from "./screens/SearchProfile";
import { Notification } from "./screens/Notification";
import { UserProfile } from "./screens/Profile/UserProfile";
import { Chat } from "./screens/Messenger/Chat";
import { Settings } from "./screens/Settings";

export const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const SearchNav = createNativeStackNavigator();
const NotificationNav = createNativeStackNavigator();
const MessengerNav = createNativeStackNavigator();
// const LoginNav = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeNav.Navigator initialRouteName="Feed">
      <HomeNav.Screen
        name="Feed"
        options={{ headerShown: false }}
        component={Home}
      />
      <HomeNav.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          headerTitle: "Settings",
        })}
      />
      <HomeNav.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      {/*     <HomeNav.Screen
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
      <SearchNav.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      {/*  <SearchNav.Screen name="Settings" component={Settings} />
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

      <MessengerNav.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          headerTitle: "User",
        })}
      />
      {/*  <MessengerNav.Screen name="Settings" component={Settings} />
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
  <Tab.Navigator
    initialRouteName="Home"
    tabBar={(props) => <Tabbar {...props} />}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Notification"
      component={NotificationStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Messenger"
      component={MessengerStack}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);
